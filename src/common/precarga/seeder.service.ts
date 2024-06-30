import { Injectable, OnModuleInit } from '@nestjs/common';
import { SedeRepository } from 'src/modules/sede/sede.repository';
import * as data from '../../common/precarga/data.json';
import * as dataUsers from '../../common/precarga/users.json';
import { CanchaRepository } from 'src/modules/cancha/cancha.repository';
import { UserRepository } from 'src/modules/user/user.repository';
import { AuthService } from 'src/modules/auth/auth.service';


@Injectable()
export class SeederService implements OnModuleInit {
  private testUser: any

  constructor(
    private readonly sedeRepository: SedeRepository,
    private readonly canchaRepository: CanchaRepository,
    private readonly serviceAuth: AuthService) { }

  async onModuleInit() {
    await this.seedData();
  }

  async seedData() {
    try {
      await this.seedUsers()
      const sedes = await this.seedSedes()
      await this.seedCanchas(sedes)
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  }

  async seedUsers() {
    const users = [];
    for (const element of dataUsers) {
      this.testUser = await this.serviceAuth.signup(element.user)
    }

    users.push(this.testUser)
  }

  async seedSedes() {
    const sedes = [];
    for (const element of data) {
      const sede = await this.sedeRepository.createSede({
        name: element.name,
        location: element.location,
        description: element.description,
        imgUrl: element.imgUrl,
        user: this.testUser.id
      });
      sedes.push(sede);
    }
    return sedes;
  }

  async seedCanchas(sedes) {
    for (const sede of sedes) {
      const sedeData = data.find(d => d.name === sede.name);
      if (sedeData && sedeData.canchas) {
        for (const cancha of sedeData.canchas) {
          await this.canchaRepository.createCancha({
            ...cancha,
            sedeId: sede.id
          }, cancha.imgUrl);
        }
      }
    }
  }
}