import type { CoffeeShop } from "@/types";

export const mockShops: CoffeeShop[] = [
  {
    id: "shop_mock_1",
    name: "Seesaw Coffee",
    city: "上海",
    address: "静安区愚园路433号",
    visitDate: "2026-06-15T10:30:00.000Z",
    rating: 5,
    order: "栀子花梨香拿铁 + 海盐卷",
    flavorNotes:
      "栀子花的香气太惊喜了，和梨的清甜融合得恰到好处，咖啡基底不苦涩，尾韵有淡淡花香。海盐卷层次分明，外层酥脆内部柔软。",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=70",
    isFavorite: true,
    createdAt: "2026-06-15T10:30:00.000Z",
  },
  {
    id: "shop_mock_2",
    name: "Manner Coffee",
    city: "上海",
    address: "黄浦区南京西路1266号恒隆广场B1",
    visitDate: "2026-06-10T08:15:00.000Z",
    rating: 4,
    order: "燕麦 Dirty",
    flavorNotes:
      "性价比之王，燕麦奶和浓缩的融合很棒，第一口有明显的层次感。杯量偏小，适合早餐快速来一杯。",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop&q=70",
    isFavorite: false,
    createdAt: "2026-06-10T08:15:00.000Z",
  },
  {
    id: "shop_mock_3",
    name: "% Arabica",
    city: "北京",
    address: "东城区三里屯太古里南区",
    visitDate: "2026-06-05T14:00:00.000Z",
    rating: 4,
    order: "Kyoto Latte + Lemon Tart",
    flavorNotes:
      "店铺设计极简白色调很出片。京都拿铁炼乳甜度刚好，咖啡风味清晰，不被奶味盖住。柠檬挞酸度平衡。",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=70",
    isFavorite: true,
    createdAt: "2026-06-05T14:00:00.000Z",
  },
  {
    id: "shop_mock_4",
    name: "Mud Coffee 泥咖啡",
    city: "成都",
    address: "锦江区镗钯街38号",
    visitDate: "2026-05-28T15:45:00.000Z",
    rating: 5,
    order: "特调 · 椒麻Dirty + 可可司康",
    flavorNotes:
      "成都限定的椒麻风味太绝了！入口先是淡淡的花椒麻感，然后是浓缩的醇厚和巧克力调，最后余韵回到奶香。花椒不突兀，创意十足。",
    image:
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&auto=format&fit=crop&q=70",
    isFavorite: true,
    createdAt: "2026-05-28T15:45:00.000Z",
  },
  {
    id: "shop_mock_5",
    name: "Soloist Coffee Co.",
    city: "北京",
    address: "西城区杨梅竹斜街39号",
    visitDate: "2026-05-20T09:20:00.000Z",
    rating: 4,
    order: "手冲 · 耶加雪菲",
    flavorNotes:
      "胡同里的独立咖啡馆，空间很有氛围感。耶加雪菲明亮的柑橘和茉莉花香，干净度不错，回甘持久。适合周末慢慢坐一下午。",
    image:
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&auto=format&fit=crop&q=70",
    isFavorite: false,
    createdAt: "2026-05-20T09:20:00.000Z",
  },
  {
    id: "shop_mock_6",
    name: "UID CAFE",
    city: "成都",
    address: "成华区建设南支路4号东郊记忆",
    visitDate: "2026-05-18T11:00:00.000Z",
    rating: 3,
    order: "美式 + 华夫饼",
    flavorNotes:
      "工业风装修，空间宽敞适合拍照。美式偏淡，中规中矩。华夫饼松软但奶油感不够，还可以改进。",
    image:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&auto=format&fit=crop&q=70",
    isFavorite: false,
    createdAt: "2026-05-18T11:00:00.000Z",
  },
  {
    id: "shop_mock_7",
    name: "Blue Bottle Coffee",
    city: "上海",
    address: "徐汇区建国西路394号",
    visitDate: "2026-06-22T13:30:00.000Z",
    rating: 4,
    order: "New Orleans Iced Coffee",
    flavorNotes:
      "上海限定新奥尔良冰咖啡，加了菊苣根有特殊的焦香和苦度，和牛奶混合后很顺滑。夏天喝非常清爽。",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&auto=format&fit=crop&q=70",
    isFavorite: false,
    createdAt: "2026-06-22T13:30:00.000Z",
  },
];
