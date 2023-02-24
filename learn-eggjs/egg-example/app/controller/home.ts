import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('egg');
  }
  public async topics() {
    const { ctx } = this;
    await ctx.service.topics.fetchTopics();
    ctx.body = 'hello ';
  }
}
