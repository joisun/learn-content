import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const res = await prisma.post.create({
    data: {
      title: '你好啊022',
      content: '你到底好不好1asfdas',
      categories: {
        connect: {
          // name: 'test 分类02',
          id: 2,
        },
      },
    },
    include: {
      categories: true,
    },
  });
  console.log('[res]: ', res);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
