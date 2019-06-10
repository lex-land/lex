import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Property } from './property.entity';
import { TreeRepository } from 'typeorm';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propRepository: TreeRepository<Property>,
  ) {}
  public async delete(id: number) {
    return this.propRepository.delete(id);
  }

  public async deleteChildren(id: number) {
    const children = await this.propRepository.findDescendants(
      Object.assign(new Property(), { id }),
    );
    return Promise.all(children.map(p => this.propRepository.delete(p.id)));
  }

  public async create(createPropDto: any) {
    return this.propRepository.save(
      Object.assign(new Property(), createPropDto),
    );
  }

  public async update(id: string, updatePropDto: any) {
    return this.propRepository.update(id, updatePropDto);
  }

  public async findTreesByIntefaceId(id: string) {
    const repo = this.propRepository;
    const roots = await repo.find({
      where: {
        interface: id,
        parent: null,
      },
    });
    return Promise.all(roots.map(p => repo.findDescendantsTree(p)));
  }

  public async createSome(properties: any) {
    const propTree: any = {};
    properties.forEach((prop: any) => {
      propTree[prop.id] = Object.assign(new Property(), prop);
      propTree[prop.id].default = prop.value;
    });
    properties.forEach((prop: any) => {
      if (prop.parentId !== -1) {
        propTree[prop.id].parent = propTree[prop.parentId];
      }
      this.propRepository.save(propTree[prop.id]);
    });
    return properties;
  }

  public async deleteMany(propertieIds: number[]) {
    return Promise.all(propertieIds.map(id => this.propRepository.delete(id)));
  }
}
