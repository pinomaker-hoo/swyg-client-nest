import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import JwtGuard from 'src/auth/passport/auth.jwt.guard'
import { ReviewService } from '../application/review.service'

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Get('/:id')
  async getReview(@Param('id') id: string) {
    return await this.reviewService.findReviewById(Number(id))
  }

  @Post('/:id')
  @UseGuards(JwtGuard)
  async saveReview(@Req() req, @Param('id') idx: string, @Body() body) {
    const { user } = req
    const { text } = body
    return await this.reviewService.saveReview(user, Number(idx), text)
  }

  @Get('/list/:id')
  async getReviewList(@Param('id') id: string) {
    return await this.reviewService.findReviewListByBook(Number(id))
  }
}
