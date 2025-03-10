import { BadRequestException } from '@nestjs/common';
const isValidUuid = (uuid: string) => {
  if (
    !uuid.match(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89ab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
    )
  ) {
    throw new BadRequestException('UUID invalide');
  }
};

export { isValidUuid };
