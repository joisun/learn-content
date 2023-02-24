import { Service } from 'egg';
//

/**
 * Test Service
 */
export default class Topics extends Service {
  /**
   * sayHi to you
   * @param name - your name
   */
  public async fetchTopics() {
    const { ctx } = this;
    const { url, limit } = this.config.topics;
    const {
      data: { data },
    } = await ctx.curl(`${url}?limit=${limit}`, {
      dataType: 'json',
    });
    console.log('[idList]: ', ctx.helper.forMatTime(data[0].create_at));
  }
}
