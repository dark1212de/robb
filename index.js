const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// قراءة التوكن من ملف .env
const TOKEN = process.env.TOKEN;

// اسم الرتبة التي سيتم إعطاؤها
const ROLE_NAME = "Roblox Player"; // اسم الرتبة المراد منحها

// ID الغرفة المسموح للبوت الرد فيها
const ALLOWED_CHANNEL_ID = '1305295266311700565';

client.once('ready', () => {
  console.log(`تم تسجيل الدخول كبوت: ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  // تجاهل رسائل البوتات
  if (message.author.bot) return;

  // التحقق من ID الغرفة
  if (message.channel.id !== ALLOWED_CHANNEL_ID) return;

  // التحقق إذا كانت الرسالة تحتوي على صورة
  if (message.attachments.size > 0) {
    try {
      // البحث عن الرتبة في السيرفر
      const role = message.guild.roles.cache.find((r) => r.name === ROLE_NAME);
      if (!role) {
        return message.reply(`لم أتمكن من العثور على رتبة باسم "${ROLE_NAME}". يرجى إنشاءها أولاً.`);
      }

      // منح الرتبة للمستخدم
      const member = message.guild.members.cache.get(message.author.id);
      if (member.roles.cache.has(role.id)) {
        return message.reply("لديك بالفعل هذه الرتبة!");
      }

      await member.roles.add(role);
      message.reply(`تم منحك رتبة "${ROLE_NAME}" بنجاح!`);
    } catch (error) {
      console.error(error);
      message.reply("حدث خطأ أثناء محاولة منح الرتبة.");
    }
  } else {
    // إذا لم تكن هناك صورة مرفقة
    message.reply("يرجى إرسال صورة لحسابك في Roblox للحصول على الرتبة.");
  }
});

// تسجيل الدخول للبوت
client.login("MTMxNjcyMjIyNTQ3ODUwNDUwOA.G3QATz.ehkSECenSgxQUkdAy8Y2CMybHj5aT_6ZWfjMBQ");
