import { ForbiddenException, Injectable } from '@nestjs/common';
import { RandomGenerator } from 'src/common/helpers';
import { ArgonHelper } from 'src/common/helpers/argon.helper';
import { sendEmailModel, SMTP } from 'src/common/utils';
import { Profile, Staff, User } from 'src/models';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Admin } from 'src/models/admin.model';
import { Delivery } from 'src/models/delivery.model';

@Injectable()
export class DeliveryService {
  /**
   *
   */
  constructor(
    private readonly userModel: User,
    private readonly argonHelper: ArgonHelper,
    private readonly Smtp: SMTP,
    private readonly deliveryModel: Delivery,
    private readonly profileModel: Profile,
    private readonly randomGenerator: RandomGenerator
  ) {}

  async create(createDeliveryDto: CreateDeliveryDto) {
    const password = this.randomGenerator.generateRandomChars(10);
    const hashPw = await this.argonHelper.hash(password);
    const newUser = await this.userModel.createUser({
      ...createDeliveryDto,
      password: hashPw,
      confirmPassword: hashPw,
    });

    if (!newUser) throw new ForbiddenException('email is already exist');

    const smtp: sendEmailModel = {
      subject: `Employee Created!`,
      content: `<div> 
          <h3> hello ${createDeliveryDto.firstname} ${createDeliveryDto.lastname} </h3>

          <p> We are informing you that you are hired in Zsackers cafe. </p>

          <h4>These are your credentials</h4>

          <section>
            <div> <strong> Firstname: </strong> <label> ${createDeliveryDto.firstname} </label> </div>
            <div> <strong> Lastname: </strong> <label> ${createDeliveryDto.lastname} </label> </div>
            <div> <strong> Address: </strong> <label> ${createDeliveryDto.address} </label> </div>
            <div> <strong> Contact: </strong> <label> ${createDeliveryDto.contact} </label> </div>
            <div> <strong> Email: </strong> <label> ${createDeliveryDto.email} </label> </div>
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
    const allStaff = await this.deliveryModel.findAll();
    return allStaff;
  }

  findOne(id: number) {
    return `This action returns a #${id} staff`;
  }

  async update(id: number, status: "INACTIVE" | "ACTIVE") {

    const updatedStaff = await this.deliveryModel.updateOne(id, status);

    if(!updatedStaff) throw new ForbiddenException('Error occured!');

    return updatedStaff
  }

  async remove(id: number) {
    const deletedAdminProfile = await this.profileModel.deleteOne(id);
    const deletedAdmin = await this.deliveryModel.deleteOne(id);

    if(!deletedAdmin) throw new ForbiddenException('Error occured!');

    return deletedAdmin;
  }
}
