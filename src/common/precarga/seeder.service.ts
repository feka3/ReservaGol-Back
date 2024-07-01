import { Injectable, OnModuleInit } from '@nestjs/common';
import { SedeRepository } from 'src/modules/sede/sede.repository';
import * as data from '../../common/precarga/data.json';
import * as dataUsers from '../../common/precarga/users.json';
import * as bcrypt from "bcrypt";
import { CanchaRepository } from 'src/modules/cancha/cancha.repository';
import { AuthService } from 'src/modules/auth/auth.service';
import { User } from 'src/modules/user/user.entity';
import { Role } from 'src/modules/user/roles.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { log } from 'console';

@Injectable()
export class SeederService implements OnModuleInit {
  private testUser: any;

  constructor(
    private readonly sedeRepository: SedeRepository,
    private readonly canchaRepository: CanchaRepository,
    private readonly serviceAuth: AuthService,
    @InjectRepository(User) private readonly user: Repository<User>,
  ) { }

  async onModuleInit() {
    await this.seedData();
  }

  async seedData() {
    try {
      await this.seedUsers();
      // const sedes = await this.seedSedes();
      // await this.seedCanchas(sedes);
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  }

  async seedUsers() {
    const users = [];
    for (const user of dataUsers) {
      const userEntity = new User();
      userEntity.email = user.email;
      userEntity.name = user.name;
      userEntity.password = await bcrypt.hash(user.password, 10);
      userEntity.phone = user.phone;
      userEntity.imgUrl = user.imgUrl;

      const role = user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase();
      userEntity.rol = Role[role]; // Asignación del rol correcta

      console.log(role);


      await this.user.save(userEntity);
    }
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
      sedes.push({ ...sede, canchas: element.canchas });
    }
    return sedes;
  }



  async seedCanchas(sedes) {
    for (const sede of sedes) {
      if (sede.canchas) {
        for (const cancha of sede.canchas) {
          await this.canchaRepository.createCancha({
            name: cancha.name,
            price: cancha.price,
            sport: cancha.sport,
            type: cancha.type,
            player: cancha.player,
            timeopen: cancha.timeopen,
            timeclose: cancha.timeclose,
            techado: cancha.techado,
            sedeName: sede.name,
          }, cancha.imgUrl);
        }
      }
    }
  }
  async capitalizeFirstLetter(str: string) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
