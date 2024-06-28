import { Injectable, OnModuleInit } from '@nestjs/common';
import { SedeRepository } from 'src/modules/sede/sede.repository';
import * as data from '../../common/precarga/data.json';
import * as dataUsers from '../../common/precarga/users.json';
import { canchaRepository } from 'src/modules/cancha/cancha.repository';
import { UserRepository } from 'src/modules/user/user.repository';


@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    private readonly sedeRepository: SedeRepository,
    private readonly canchaRepository: canchaRepository,
    private readonly userRepository: UserRepository) {}

  async onModuleInit() {
    await this.seedData();
  }

  async seedData(){
    try {
      await this.seedUsers()
      const sedes = await this.seedSedes()
      await this.seedCanchas(sedes)
    } catch (error) {
      console.error('Error seeding data:', error);      
    }
  }

  async seedUsers() {
    for (const element of dataUsers) {
      if (element.user){
          await this.userRepository.postUser({
          name: element.user.name,
          email: element.user.email,
          password: element.user.password,
          birthdate: element.user.birthdate,
          dni: element.user.dni,
          phone: element.user.phone,
          city: element.user.city,
          address: element.user.address,
          imgUrl: element.user.imgUrl
        })
      }
      }
    }

  async seedSedes() {
    const sedes = [];
    for (const element of data) {
      const sede = await this.sedeRepository.createSede({
        name: element.name,
        location: element.location,
        description: element.description,
        imgUrl: element.imgUrl
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