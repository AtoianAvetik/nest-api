import { ApiModelProperty } from '@nestjs/swagger';
import { ExceptionDto } from './exception.dto';

class FieldDto {
    @ApiModelProperty({isArray: true, example: ['Error message X']})
    readonly errors: string;
}

class ChildrenDto {
    @ApiModelProperty({type: FieldDto})
    readonly fieldName: FieldDto;
}

class ErrorsDto {
    @ApiModelProperty({isArray: true, example: ['Error message Y (when error is NOT about a specific field)']})
    readonly errors: string;

    @ApiModelProperty({type: ChildrenDto})
    readonly children: ChildrenDto;
}

export class ValidationErrorDto extends ExceptionDto {
    @ApiModelProperty({type: ErrorsDto})
    readonly errors: ErrorsDto;
}
