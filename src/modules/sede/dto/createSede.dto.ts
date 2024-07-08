import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class CreateSedeDto {

    /**
     * Nombre de la sede.
     * @example SedeTest
     */
    @IsNotEmpty()
    @IsString()
    name: string;

    /**
     * Ubicacion de la sede.
     * @example Ejemplo
     */
    @IsNotEmpty()
    @IsString()
    location: string;

    /**
     * Descripción de la sede.
     * @example Descripcion
     */
    @IsNotEmpty()
    @IsString()
    description: string;

  /**
   * Usuario asociado a la sede.
   * - Es del tipo UUID.
   */
    @IsNotEmpty()
    @IsUUID()
    user: UUID

    /** 
     *  Por defecto se asigna imagen genérica.  
     * @example "https://test.com/test.png"
     */
    @IsOptional()
    imgUrl: string;
}

export class UpdateSedeDto {

    /**
     * Nombre de la sede.
     * @example SedeTest
     */
    @IsOptional()
    @IsString()
    name: string;

    /**
     * Ubicacion de la sede.
     * @example Ejemplo
     */
    @IsOptional()
    @IsString()
    location: string;

    /**
     * Descripción de la sede.
     * @example Descripcion
     */
    @IsOptional()
    @IsString()
    description: string;

    /** 
     *  Por defecto se asigna imagen genérica.  
     * @example "https://test.com/test.png"
     */
    @IsOptional()
    imgUrl: string;
}