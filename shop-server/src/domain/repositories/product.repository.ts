import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { SearchDto } from "domain/dtos/search.dto";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class ProductRepository {
    constructor (private readonly prisma: PrismaService) {}

    async findAll() {
        return await this.prisma.product.findMany({
            include: {
                category: true
            }
        })
    }

    async reduceStock(productId: string, reduceAmount: number) {
        return await this.prisma.product.update({
            where: {
                id: productId
            },
            data: {
                stock: {
                    decrement: reduceAmount
                }
            }
        })
    }

    async findById(productId: string) {
        return await this.prisma.product.findFirst({
            where: {
                id: productId
            }
        })
    }

    async findFiltered(dto: SearchDto) {
        return await this.prisma.product.findMany({
            where: this.createFilter(dto),
            orderBy: this.createSort(dto),
            include: {
                category: true
            }
        })
    }

    private createFilter (dto: SearchDto) {
        const filters: Prisma.ProductWhereInput[] = []

        if (dto.minPrice || dto.maxPrice) {
            filters.push(this.createPriceFilter(dto.minPrice, dto.maxPrice))
        }

        if (dto.searchTerm) {
            filters.push(this.createSearchTermFilter(dto.searchTerm))
        }

        if (dto.categoryName) {
            filters.push(this.createCategoryFilter(dto.categoryName))
        }

        return {AND : filters}
    }

    private createSearchTermFilter (searchTerm: string) : Prisma.ProductWhereInput {
        return {
            OR : [
                {category: {
                    name: {
                        contains: searchTerm,
                        mode: 'insensitive'
                    }
                }},
                {name: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }},
                {description: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }}
            ]
        }
    }

    private createPriceFilter(
        minPrice?: string,
        maxPrice?: string
    ) : Prisma.ProductWhereInput {
        let priceFilter: Prisma.IntFilter | undefined = undefined

        if (maxPrice) {
            priceFilter = {
                ...priceFilter,
                lte: +maxPrice
            }
        }

        if (minPrice) {
            priceFilter = {
                ...priceFilter,
                gte: +minPrice
            }
        }

        return {price: priceFilter}
    }

    private createSort(dto: Pick<SearchDto,
         'sortBy' | 
         'direction'>): Prisma.ProductOrderByWithRelationInput {
            
        if (!dto.sortBy) {
            return {name: 'asc'}
        }

        switch (dto.sortBy) {
            case "name":  return {name: dto.direction}
            case "price": return {price: dto.direction}
            case "stock": return {stock: dto.direction}
            default: return {name: 'asc'}
        }
    }

    private createCategoryFilter(categoryName: string) : Prisma.ProductWhereInput {
        return {
            category: {
                name: {
                    contains: categoryName,
                    mode: 'insensitive'
                }
            }
        }
    }

}