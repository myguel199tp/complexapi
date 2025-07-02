import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}

// src/payment/payment.service.ts
// import { Injectable } from '@nestjs/common';
// import axios from 'axios';

// @Injectable()
// export class PaymentService {
//   private readonly WOMPI_API = 'https://sandbox.wompi.co/v1';
//   private readonly PUBLIC_KEY = process.env.WOMPI_PUBLIC_KEY!;
//   private readonly PRIVATE_KEY = process.env.WOMPI_PRIVATE_KEY!;

//   async createTransaction(reference: string) {
//     const response = await axios.post(`${this.WOMPI_API}/transactions`, {
//       amount_in_cents: 5000,
//       currency: 'COP',
//       customer_email: 'cliente@correo.com',
//       payment_method: {
//         type: 'CARD',
//         installments: 1,
//       },
//       reference,
//       redirect_url: 'http://localhost:3000/success',
//     }, {
//       headers: {
//         Authorization: `Bearer ${this.PRIVATE_KEY}`,
//       },
//     });

//     return response.data;
//   }

//   async getPaymentLink(reference: string) {
//     const response = await axios.post(`${this.WOMPI_API}/checkout_sessions`, {
//       currency: 'COP',
//       amount_in_cents: 5000,
//       customer_email: 'cliente@correo.com',
//       reference,
//       redirect_url: 'http://localhost:3000/success',
//     });

//     return {
//       url: response.data.data.checkout_url,
//     };
//   }
// }
