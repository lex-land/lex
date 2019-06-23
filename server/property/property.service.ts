import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Property } from './property.entity';
import { TreeRepository } from 'typeorm';
import { pick } from 'lodash';

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

  public async createSome(properties: any[], relations: any) {
    const propTree: any = {};
    const roots = properties.filter(row => row.parentId === -1);
    const isChildren = (parents: any) => (row: any) =>
      row.parentId && parents.some((root: any) => root.id === row.parentId);

    let currentChildren: any[] = roots;
    while (currentChildren.length > 0) {
      for (const row of currentChildren) {
        propTree[row.id] = await this.create({
          ...pick(row, ['name', 'description', 'type', 'rule', 'scope']),
          default: row.value,
          parent: propTree[row.parentId],
          ...relations,
        });
      }
      currentChildren = properties.filter(isChildren(currentChildren));
    }
    return roots;
  }

  public async deleteMany(propertieIds: number[]) {
    return Promise.all(propertieIds.map(id => this.propRepository.delete(id)));
  }
}
