import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../usuario/entities/usuario.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  // Registrar un nuevo usuario
  async register(registerDto: RegisterDto) {
    // Verificar si el email ya existe
    const existeUsuario = await this.usuarioRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existeUsuario) {
      throw new ConflictException('El email ya está registrado');
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Crear usuario
    const usuario = this.usuarioRepository.create({
      ...registerDto,
      password: hashedPassword,
    });

    const usuarioGuardado = await this.usuarioRepository.save(usuario);

    // Generar token JWT
    const token = this.generateToken(usuarioGuardado);

    return {
      message: 'Usuario registrado exitosamente',
      user: {
        id: usuarioGuardado.id,
        nombre: usuarioGuardado.nombre,
        email: usuarioGuardado.email,
        rol: usuarioGuardado.rol,
      },
      token,
    };
  }

  // Login de usuario
  async login(loginDto: LoginDto) {
    // Buscar usuario por email (incluir password)
    const usuario = await this.usuarioRepository.findOne({
      where: { email: loginDto.email },
      select: ['id', 'nombre', 'email', 'password', 'rol'],
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // Verificar contraseña
    const passwordValida = await bcrypt.compare(loginDto.password, usuario.password);

    if (!passwordValida) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // Generar token JWT
    const token = this.generateToken(usuario);

    return {
      message: 'Login exitoso',
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
      token,
    };
  }

  // Validar usuario por ID (usado por el guard JWT)
  async validateUser(id: number) {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      select: ['id', 'nombre', 'email', 'rol'],
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return usuario;
  }

  // Obtener perfil del usuario autenticado
  async getProfile(userId: number) {
    const usuario = await this.usuarioRepository.findOne({
      where: { id: userId },
      select: ['id', 'nombre', 'email', 'rol', 'createdAt', 'updatedAt'],
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return usuario;
  }

  // Generar token JWT
  private generateToken(usuario: Usuario): string {
    const payload = {
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
    };

    return this.jwtService.sign(payload);
  }
}
