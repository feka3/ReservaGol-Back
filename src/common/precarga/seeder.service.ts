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
import { Sede } from 'src/modules/sede/sede.entity';
import { Cancha } from 'src/modules/cancha/cancha.entity';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Sede) private readonly sede: Repository<Sede>,
    @InjectRepository(Cancha) private readonly cancha: Repository<Cancha>,
  ) { }

  async onModuleInit() {
    await this.seedData();
  }

  async seedData() {
    try {
      await this.seedUsers();
      await this.seedSedes();
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  }

  async seedUsers() {
    for (const user of dataUsers) {
      const userEntity = new User();
      userEntity.email = user.email;
      userEntity.name = user.name;
      userEntity.password = await bcrypt.hash(user.password, 10);
      userEntity.phone = user.phone;
      userEntity.imgUrl = user.imgUrl;

      const role = user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase();
      userEntity.rol = Role[role]; // Asignación del rol correctamente

      await this.user.save(userEntity);
    }
  }

  async seedSedes() {
    const user = await this.user.findOne({
      where: { rol: Role['admin'] },
    });
    for (const sedeData of data) {
      const sedeEntity = new Sede();
      sedeEntity.name = sedeData.name;
      sedeEntity.location = sedeData.location;
      sedeEntity.description = sedeData.description;
      sedeEntity.imgUrl = sedeData.imgUrl;
      sedeEntity.user = user;
      sedeEntity.canchas = [];

      await this.sede.save(sedeEntity);

      for (const canchaData of sedeData.canchas) {
        const canchaEntity = new Cancha();
        canchaEntity.name = canchaData.name;
        canchaEntity.price = canchaData.price;
        canchaEntity.sport = Number(canchaData.sport);
        canchaEntity.type = canchaData.type;
        canchaEntity.player = canchaData.player;
        canchaEntity.timeopen = canchaData.timeopen;
        canchaEntity.timeclose = canchaData.timeclose;
        canchaEntity.techado = canchaData.techado;
        canchaEntity.sede = sedeEntity;
        canchaEntity.imgUrl = canchaData.imgUrl;
        canchaEntity.sede = sedeEntity;
        await this.cancha.save(canchaEntity);
      }
    }
  }
}