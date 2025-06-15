import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: 'blog.sqlite',
    entities: [__dirname + '/domain/**/*.entity{.ts,.js}'],
    synchronize: true // For production turn into 'false'
}