import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { Repository } from 'typeorm';

@Injectable()
export class GenerateSlugService<T> {
  constructor(private readonly repository: Repository<T>) {}

  async generateSlug(value: string): Promise<string> {
    let slug = slugify(value, { lower: true });
    let serial = 1;

    while (await this.checkExists('slug', slug)) {
      slug = `${slug}-${serial}`;
      serial++;
    }

    return slug;
  }

  async checkExists(field: string, value: any): Promise<boolean> {
    const entity = await this.repository.findOne({ [field]: value });
    return !!entity;
  }
}
