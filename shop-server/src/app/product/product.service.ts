import { Injectable } from '@nestjs/common';
import { SearchDto } from 'domain/dtos/search.dto';
import { ProductRepository } from 'domain/repositories/product.repository';

@Injectable()
export class ProductService {
    constructor( private readonly productRepository: ProductRepository) {}

    async getAll() {
        return await this.productRepository.findAll()
    } 

    async getFiltered(dto: SearchDto) {
        return await this.productRepository.findFiltered(dto)
    }
}
