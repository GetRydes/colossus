import { Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

export class ControllerCallback {
  constructor(public Controller) {}

  callback(@Req() request: Request, @Res() response: Response) {
    return { request, response };
  }
}
