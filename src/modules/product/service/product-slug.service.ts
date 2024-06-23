import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';

@Injectable()
export class GenerateProductSlugService {
  constructor(private readonly productRepository: ProductRepository) {}

  async generateSlug(value: string): Promise<string> {
    let slug = value.toLowerCase().replace(/\s+/g, '-');
    let serial = 1;

    while (await this.checkExists(slug)) {
      slug = `${slug}-${serial}`;
      serial++;
    }

    return slug;
  }

  async checkExists(value: string): Promise<boolean> {
    const product = await this.productRepository.findOneBy({ slug: value });
    return !!product;
  }
}
