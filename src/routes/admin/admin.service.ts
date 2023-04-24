import { ForbiddenException, Injectable } from '@nestjs/common';
import { RandomGenerator } from 'src/common/helpers';
import { ArgonHelper } from 'src/common/helpers/argon.helper';
import { sendEmailModel, SMTP } from 'src/common/utils';
import { Profile, Staff, User } from 'src/models';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from 'src/models/admin.model';

@Injectable()
export class AdminService {
  /**
   *
   */
  constructor(
    private readonly userModel: User,
    private readonly argonHelper: ArgonHelper,
    private readonly Smtp: SMTP,
    private readonly adminModel: Admin,
    private readonly profileModel: Profile,
    private readonly randomGenerator: RandomGenerator
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const password = this.randomGenerator.generateRandomChars(10);
    const hashPw = await this.argonHelper.hash(password);
    const newUser = await this.userModel.createUser({
      ...createAdminDto,
      password: hashPw,
      confirmPassword: hashPw,
    });

    if (!newUser) throw new ForbiddenException('email is already exist');

    const smtp: sendEmailModel = {
      subject: `Employee Created!`,
      content: `<div> 
          <h3> hello ${createAdminDto.firstname} ${createAdminDto.lastname} </h3>

          <p> We are informing you that you are hired in Zsackers cafe. </p>

          <h4>These are your credentials</h4>

          <section>
            <div> <strong> Firstname: </strong> <label> ${createAdminDto.firstname} </label> </div>
            <div> <strong> Lastname: </strong> <label> ${createAdminDto.lastname} </label> </div>
            <div> <strong> Address: </strong> <label> ${createAdminDto.address} </label> </div>
            <div> <strong> Contact: </strong> <label> ${createAdminDto.contact} </label> </div>
            <div> <strong> Email: </strong> <label> ${createAdminDto.email} </label> </div>
            <div> <strong> Password: </strong> <label> ${password} </label> </div>
          </section>

          <p> please keep this credentials secure and dont share it to other people, Thank you!  </p>

          <small> - Zsackers cafe | ADMIN </small>
      </div>`,
      emailTo: newUser.email,
    };

    this.Smtp.sendEmail(smtp);

    return newUser;
  }

  async findAll() {
    const allStaff = await this.adminModel.findAll();
    return allStaff;
  }

  findOne(id: number) {
    return `This action returns a #${id} staff`;
  }

  async update(id: number, status: "INACTIVE" | "ACTIVE") {

    const updatedStaff = await this.adminModel.updateOne(id, status);

    if(!updatedStaff) throw new ForbiddenException('Error occured!');

    return updatedStaff
  }

  async remove(id: number) {
    const deletedAdminProfile = await this.profileModel.deleteOne(id);
    const deletedAdmin = await this.adminModel.deleteOne(id);

    if(!deletedAdmin) throw new ForbiddenException('Error occured!');

    return deletedAdmin;
  }
}
