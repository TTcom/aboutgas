const city = [
  {
    text: "全部地区",
    id: "500000",
    administrativeCode: "",
    children: [
      {
        text: "全部地区",
        id: "500100",
        administrativeCode: ""
      }
    ]
  },
  {
    text: "安徽",
    id: "100000",
    administrativeCode: "340000",
    children: [
      {
        text: "合肥",
        id: "100100",
        administrativeCode: "340100"
      },
      {
        text: "安庆",
        id: "100200",
        administrativeCode: "340800"
      },
      {
        text: "蚌埠",
        id: "100300",
        administrativeCode: "340300"
      },
      {
        text: "亳州",
        id: "100400",
        administrativeCode: "341600"
      },
      {
        text: "滁州",
        id: "100600",
        administrativeCode: "341100"
      },
      {
        text: "池州",
        id: "100700",
        administrativeCode: "341700"
      },
      {
        text: "阜阳",
        id: "100800",
        administrativeCode: "341200"
      },
      {
        text: "淮北",
        id: "100900",
        administrativeCode: "340600"
      },
      {
        text: "淮南",
        id: "101000",
        administrativeCode: "340400"
      },
      {
        text: "黄山",
        id: "101100",
        administrativeCode: "341000"
      },
      {
        text: "六安",
        id: "101200",
        administrativeCode: "341500"
      },
      {
        text: "马鞍山",
        id: "101300",
        administrativeCode: "340500"
      },
      {
        text: "宿州",
        id: "101400",
        administrativeCode: "341300"
      },
      {
        text: "铜陵",
        id: "101500",
        administrativeCode: "340700"
      },
      {
        text: "芜湖",
        id: "101600",
        administrativeCode: "340200"
      },
      {
        text: "宣城",
        id: "101700",
        administrativeCode: "341800"
      }
    ]
  },
  {
    text: "澳门",
    id: "800000",
    administrativeCode: "820000",
    children: [
      {
        text: "澳门",
        id: "800100",
        administrativeCode: "820000"
      }
    ]
  },
  {
    text: "北京",
    id: "500000",
    administrativeCode: "110000",
    children: [
      {
        text: "北京",
        id: "500100",
        administrativeCode: "110000"
      }
    ]
  },
  {
    text: "重庆",
    id: "300000",
    administrativeCode: "500000",
    children: [
      {
        text: "重庆",
        id: "300100",
        administrativeCode: "500000"
      }
    ]
  },
  {
    text: "福建",
    id: "110000",
    administrativeCode: "350000",
    children: [
      {
        text: "厦门",
        id: "110100",
        administrativeCode: "厦门济南"
      },
      {
        text: "福州",
        id: "110200",
        administrativeCode: "350100"
      },
      {
        text: "龙岩",
        id: "110300",
        administrativeCode: "350800"
      },
      {
        text: "宁德",
        id: "110400",
        administrativeCode: "350900"
      },
      {
        text: "南平",
        id: "110500",
        administrativeCode: "350700"
      },
      {
        text: "莆田",
        id: "110600",
        administrativeCode: "350300"
      },
      {
        text: "泉州",
        id: "110700",
        administrativeCode: "350500"
      },
      {
        text: "三明",
        id: "110800",
        administrativeCode: "350400"
      },
      {
        text: "漳州",
        id: "110900",
        administrativeCode: "350600"
      }
    ]
  },
  {
    text: "广东",
    id: "200000",
    administrativeCode: "440000",
    children: [
      {
        text: "广州",
        id: "200100",
        administrativeCode: "广州广州"
      },
      {
        text: "潮州",
        id: "200200",
        administrativeCode: "445100"
      },
      {
        text: "东莞",
        id: "200300",
        administrativeCode: "441900"
      },
      {
        text: "佛山",
        id: "200400",
        administrativeCode: "440600"
      },
      {
        text: "河源",
        id: "200500",
        administrativeCode: "441600"
      },
      {
        text: "惠州",
        id: "200600",
        administrativeCode: "441300"
      },
      {
        text: "江门",
        id: "200700",
        administrativeCode: "440700"
      },
      {
        text: "揭阳",
        id: "200800",
        administrativeCode: "445200"
      },
      {
        text: "茂名",
        id: "200900",
        administrativeCode: "440900"
      },
      {
        text: "梅州",
        id: "201000",
        administrativeCode: "441400"
      },
      {
        text: "清远",
        id: "201100",
        administrativeCode: "441800"
      },
      {
        text: "韶关",
        id: "201200",
        administrativeCode: "440200"
      },
      {
        text: "汕头",
        id: "201300",
        administrativeCode: "440500"
      },
      {
        text: "汕尾",
        id: "201400",
        administrativeCode: "441500"
      },
      {
        text: "深圳",
        id: "201500",
        administrativeCode: "440300"
      },
      {
        text: "云浮",
        id: "201600",
        administrativeCode: "445300"
      },
      {
        text: "阳江",
        id: "201700",
        administrativeCode: "441700"
      },
      {
        text: "珠海",
        id: "201800",
        administrativeCode: "440400"
      },
      {
        text: "湛江",
        id: "201900",
        administrativeCode: "440800"
      },
      {
        text: "肇庆",
        id: "202000",
        administrativeCode: "441200"
      },
      {
        text: "中山",
        id: "202100",
        administrativeCode: "442000"
      }
    ]
  },
  {
    text: "甘肃",
    id: "400000",
    administrativeCode: "620000",
    children: [
      {
        text: "兰州",
        id: "400100",
        administrativeCode: "620100"
      },
      {
        text: "白银",
        id: "400200",
        administrativeCode: "620400"
      },
      {
        text: "定西",
        id: "400300",
        administrativeCode: "621100"
      },
      {
        text: "甘南州",
        id: "400400",
        administrativeCode: "623000"
      },
      {
        text: "金昌",
        id: "400500",
        administrativeCode: "620300"
      },
      {
        text: "酒泉",
        id: "400600",
        administrativeCode: "620900"
      },
      {
        text: "嘉峪关",
        id: "400700",
        administrativeCode: "620200"
      },
      {
        text: "陇南",
        id: "400800",
        administrativeCode: "621200"
      },
      {
        text: "临夏州",
        id: "400900",
        administrativeCode: "622900"
      },
      {
        text: "平凉",
        id: "401000",
        administrativeCode: "620800"
      },
      {
        text: "庆阳",
        id: "401100",
        administrativeCode: "621000"
      },
      {
        text: "天水",
        id: "401200",
        administrativeCode: "620500"
      },
      {
        text: "武威",
        id: "401300",
        administrativeCode: "620600"
      },
      {
        text: "张掖",
        id: "401400",
        administrativeCode: "620700"
      }
    ]
  },
  {
    text: "广西",
    id: "210000",
    administrativeCode: "450000",
    children: [
      {
        text: "南宁",
        id: "210100",
        administrativeCode: "450100"
      },
      {
        text: "北海",
        id: "210200",
        administrativeCode: "450500"
      },
      {
        text: "百色",
        id: "210300",
        administrativeCode: "451000"
      },
      {
        text: "崇左",
        id: "210400",
        administrativeCode: "451400"
      },
      {
        text: "防城港",
        id: "210500",
        administrativeCode: "450600"
      },
      {
        text: "贵港",
        id: "210600",
        administrativeCode: "450800"
      },
      {
        text: "桂林",
        id: "210700",
        administrativeCode: "450300"
      },
      {
        text: "河池",
        id: "210800",
        administrativeCode: "451200"
      },
      {
        text: "贺州",
        id: "210900",
        administrativeCode: "451100"
      },
      {
        text: "来宾",
        id: "211000",
        administrativeCode: "451300"
      },
      {
        text: "柳州",
        id: "211100",
        administrativeCode: "450200"
      },
      {
        text: "钦州",
        id: "211200",
        administrativeCode: "450700"
      },
      {
        text: "梧州",
        id: "211300",
        administrativeCode: "450400"
      },
      {
        text: "玉林",
        id: "211400",
        administrativeCode: "450900"
      }
    ]
  },
  {
    text: "贵州",
    id: "310000",
    administrativeCode: "520000",
    children: [
      {
        text: "贵阳",
        id: "310100",
        administrativeCode: "520100"
      },
      {
        text: "安顺",
        id: "310200",
        administrativeCode: "520400"
      },
      {
        text: "毕节",
        id: "310300",
        administrativeCode: "522401"
      },
      {
        text: "六盘水",
        id: "310400",
        administrativeCode: "520200"
      },
      {
        text: "黔东南州",
        id: "310500",
        administrativeCode: "522600"
      },
      {
        text: "黔南州",
        id: "310600",
        administrativeCode: "黔南布依族苗族自治州"
      },
      {
        text: "黔西南州",
        id: "310700",
        administrativeCode: "522300"
      },
      {
        text: "贵州铜仁",
        id: "310800",
        administrativeCode: "522201"
      },
      {
        text: "遵义",
        id: "310900",
        administrativeCode: "520300"
      }
    ]
  },
  {
    text: "湖北",
    id: "700000",
    administrativeCode: "420000",
    children: [
      {
        text: "武汉",
        id: "700100",
        administrativeCode: "420100"
      },
      {
        text: "恩施州",
        id: "700200",
        administrativeCode: "422800"
      },
      {
        text: "鄂州",
        id: "700300",
        administrativeCode: "420700"
      },
      {
        text: "黄冈",
        id: "700400",
        administrativeCode: "421100"
      },
      {
        text: "黄石",
        id: "700500",
        administrativeCode: "420200"
      },
      {
        text: "荆门",
        id: "700600",
        administrativeCode: "420800"
      },
      {
        text: "荆州",
        id: "700700",
        administrativeCode: "421000"
      },
      {
        text: "十堰",
        id: "700800",
        administrativeCode: "420300"
      },
      {
        text: "随州",
        id: "700900",
        administrativeCode: "421300"
      },
      {
        text: "襄樊",
        id: "701000",
        administrativeCode: "420600"
      },
      {
        text: "孝感",
        id: "701100",
        administrativeCode: "420900"
      },
      {
        text: "咸宁",
        id: "701200",
        administrativeCode: "421200"
      },
      {
        text: "宜昌",
        id: "701300",
        administrativeCode: "420500"
      },
      {
        text: "仙桃",
        id: "701400",
        administrativeCode: "429004"
      },
      {
        text: "天门",
        id: "701500",
        administrativeCode: "431700"
      },
      {
        text: "潜江",
        id: "701600",
        administrativeCode: "429005"
      },
      {
        text: "神农架林区",
        id: "701700",
        administrativeCode: "429021"
      }
    ]
  },
  {
    text: "河北",
    id: "510000",
    administrativeCode: "130000",
    children: [
      {
        text: "石家庄",
        id: "510100",
        administrativeCode: "130100"
      },
      {
        text: "保定",
        id: "510200",
        administrativeCode: "130600"
      },
      {
        text: "承德",
        id: "510300",
        administrativeCode: "130800"
      },
      {
        text: "沧州",
        id: "510400",
        administrativeCode: "130900"
      },
      {
        text: "邯郸",
        id: "510500",
        administrativeCode: "130400"
      },
      {
        text: "衡水",
        id: "510600",
        administrativeCode: "131100"
      },
      {
        text: "廊坊",
        id: "510700",
        administrativeCode: "131000"
      },
      {
        text: "秦皇岛",
        id: "510800",
        administrativeCode: "130300"
      },
      {
        text: "唐山",
        id: "510900",
        administrativeCode: "130200"
      },
      {
        text: "邢台",
        id: "511000",
        administrativeCode: "130500"
      },
      {
        text: "张家口",
        id: "511100",
        administrativeCode: "130700"
      }
    ]
  },
  {
    text: "河南",
    id: "710000",
    administrativeCode: "410000",
    children: [
      {
        text: "郑州",
        id: "710100",
        administrativeCode: "410100"
      },
      {
        text: "安阳",
        id: "710200",
        administrativeCode: "410500"
      },
      {
        text: "鹤壁",
        id: "710300",
        administrativeCode: "410600"
      },
      {
        text: "焦作",
        id: "710400",
        administrativeCode: "410800"
      },
      {
        text: "开封",
        id: "710500",
        administrativeCode: "410200"
      },
      {
        text: "漯河",
        id: "710600",
        administrativeCode: "411100"
      },
      {
        text: "洛阳",
        id: "710700",
        administrativeCode: "410300"
      },
      {
        text: "南阳",
        id: "710800",
        administrativeCode: "411300"
      },
      {
        text: "平顶山",
        id: "710900",
        administrativeCode: "410400"
      },
      {
        text: "濮阳",
        id: "711000",
        administrativeCode: "410900"
      },
      {
        text: "三门峡",
        id: "711100",
        administrativeCode: "411200"
      },
      {
        text: "商丘",
        id: "711200",
        administrativeCode: "411400"
      },
      {
        text: "许昌",
        id: "711300",
        administrativeCode: "411000"
      },
      {
        text: "新乡",
        id: "711400",
        administrativeCode: "410700"
      },
      {
        text: "信阳",
        id: "711500",
        administrativeCode: "411500"
      },
      {
        text: "周口",
        id: "711600",
        administrativeCode: "411600"
      },
      {
        text: "驻马店",
        id: "711700",
        administrativeCode: "411700"
      },
      {
        text: "济源",
        id: "711800",
        administrativeCode: "411800"
      }
    ]
  },
  {
    text: "黑龙江",
    id: "600000",
    administrativeCode: "230000",
    children: [
      {
        text: "哈尔滨",
        id: "600100",
        administrativeCode: "230100"
      },
      {
        text: "大庆",
        id: "600200",
        administrativeCode: "230600"
      },
      {
        text: "大兴安岭",
        id: "600300",
        administrativeCode: "232700"
      },
      {
        text: "鹤岗",
        id: "600400",
        administrativeCode: "230400"
      },
      {
        text: "黑河",
        id: "600500",
        administrativeCode: "231100"
      },
      {
        text: "佳木斯",
        id: "600600",
        administrativeCode: "230800"
      },
      {
        text: "鸡西",
        id: "600700",
        administrativeCode: "230300"
      },
      {
        text: "牡丹江",
        id: "600800",
        administrativeCode: "231000"
      },
      {
        text: "齐齐哈尔",
        id: "600900",
        administrativeCode: "230200"
      },
      {
        text: "七台河",
        id: "601000",
        administrativeCode: "230900"
      },
      {
        text: "绥化",
        id: "601100",
        administrativeCode: "231200"
      },
      {
        text: "双鸭山",
        id: "601200",
        administrativeCode: "230500"
      },
      {
        text: "伊春",
        id: "601300",
        administrativeCode: "230700"
      }
    ]
  },
  {
    text: "海南",
    id: "220000",
    administrativeCode: "460000",
    children: [
      {
        text: "海口",
        id: "220100",
        administrativeCode: "460100"
      },
      {
        text: "三亚",
        id: "220200",
        administrativeCode: "460200"
      },
      {
        text: "文昌",
        id: "220300",
        administrativeCode: "469005"
      },
      {
        text: "五指山",
        id: "220400",
        administrativeCode: "469001"
      },
      {
        text: "琼海",
        id: "220500",
        administrativeCode: "469002"
      },
      {
        text: "陵水",
        id: "220600",
        administrativeCode: "469028"
      },
      {
        text: "儋州",
        id: "220700",
        administrativeCode: "571700"
      },
      {
        text: "万宁市",
        id: "220800",
        administrativeCode: "469006"
      },
      {
        text: "保亭县",
        id: "220900",
        administrativeCode: "469029"
      },
      {
        text: "东方市",
        id: "221000",
        administrativeCode: "469007"
      },
      {
        text: "定安",
        id: "221100",
        administrativeCode: "469021"
      },
      {
        text: "屯昌",
        id: "221200",
        administrativeCode: "469022"
      },
      {
        text: "澄迈",
        id: "221300",
        administrativeCode: "469023"
      },
      {
        text: "临高",
        id: "221400",
        administrativeCode: "469024"
      },
      {
        text: "白沙",
        id: "221500",
        administrativeCode: "469025"
      },
      {
        text: "昌江",
        id: "221600",
        administrativeCode: "469026"
      },
      {
        text: "乐东",
        id: "221700",
        administrativeCode: "469027"
      },
      {
        text: "琼中",
        id: "221800",
        administrativeCode: "469030"
      }
    ]
  },
  {
    text: "湖南",
    id: "720000",
    administrativeCode: "430000",
    children: [
      {
        text: "长沙",
        id: "720100",
        administrativeCode: "430100"
      },
      {
        text: "常德",
        id: "720200",
        administrativeCode: "430700"
      },
      {
        text: "郴州",
        id: "720300",
        administrativeCode: "431000"
      },
      {
        text: "怀化",
        id: "720400",
        administrativeCode: "431200"
      },
      {
        text: "衡阳",
        id: "720500",
        administrativeCode: "430400"
      },
      {
        text: "娄底",
        id: "720600",
        administrativeCode: "431300"
      },
      {
        text: "邵阳",
        id: "720700",
        administrativeCode: "430500"
      },
      {
        text: "湘潭",
        id: "720800",
        administrativeCode: "430300"
      },
      {
        text: "湘西州",
        id: "720900",
        administrativeCode: "湘西土家族苗族自治州"
      },
      {
        text: "益阳",
        id: "721000",
        administrativeCode: "430900"
      },
      {
        text: "岳阳",
        id: "721100",
        administrativeCode: "430600"
      },
      {
        text: "永州",
        id: "721200",
        administrativeCode: "431100"
      },
      {
        text: "张家界",
        id: "721300",
        administrativeCode: "430800"
      },
      {
        text: "株洲",
        id: "721400",
        administrativeCode: "430200"
      }
    ]
  },
  {
    text: "吉林",
    id: "610000",
    administrativeCode: "220200",
    children: [
      {
        text: "长春",
        id: "610100",
        administrativeCode: "220100"
      },
      {
        text: "白城",
        id: "610200",
        administrativeCode: "220800"
      },
      {
        text: "白山",
        id: "610300",
        administrativeCode: "220600"
      },
      {
        text: "吉林",
        id: "610400",
        administrativeCode: "220200"
      },
      {
        text: "辽源",
        id: "610500",
        administrativeCode: "220400"
      },
      {
        text: "四平",
        id: "610600",
        administrativeCode: "220300"
      },
      {
        text: "松原",
        id: "610700",
        administrativeCode: "220700"
      },
      {
        text: "通化",
        id: "610800",
        administrativeCode: "220500"
      },
      {
        text: "延边朝州",
        id: "610900",
        administrativeCode: "延边朝鲜族自治州"
      }
    ]
  },
  {
    text: "江苏",
    id: "120000",
    administrativeCode: "320000",
    children: [
      {
        text: "南京",
        id: "120100",
        administrativeCode: "320100"
      },
      {
        text: "常州",
        id: "120200",
        administrativeCode: "320400"
      },
      {
        text: "淮安",
        id: "120300",
        administrativeCode: "320800"
      },
      {
        text: "连云港",
        id: "120400",
        administrativeCode: "320700"
      },
      {
        text: "南通",
        id: "120500",
        administrativeCode: "320600"
      },
      {
        text: "宿迁",
        id: "120600",
        administrativeCode: "321300"
      },
      {
        text: "苏州",
        id: "120700",
        administrativeCode: "320500"
      },
      {
        text: "泰州",
        id: "120800",
        administrativeCode: "321200"
      },
      {
        text: "无锡",
        id: "120900",
        administrativeCode: "320200"
      },
      {
        text: "徐州",
        id: "121000",
        administrativeCode: "320300"
      },
      {
        text: "盐城",
        id: "121100",
        administrativeCode: "320900"
      },
      {
        text: "扬州",
        id: "121200",
        administrativeCode: "321000"
      },
      {
        text: "镇江",
        id: "121300",
        administrativeCode: "321100"
      }
    ]
  },
  {
    text: "江西",
    id: "130000",
    administrativeCode: "360000",
    children: [
      {
        text: "南昌",
        id: "130100",
        administrativeCode: "360100"
      },
      {
        text: "抚州",
        id: "130200",
        administrativeCode: "361000"
      },
      {
        text: "赣州",
        id: "130300",
        administrativeCode: "360700"
      },
      {
        text: "吉安",
        id: "130400",
        administrativeCode: "360800"
      },
      {
        text: "景德镇",
        id: "130500",
        administrativeCode: "360200"
      },
      {
        text: "九江",
        id: "130600",
        administrativeCode: "360400"
      },
      {
        text: "萍乡",
        id: "130700",
        administrativeCode: "360300"
      },
      {
        text: "上饶",
        id: "130800",
        administrativeCode: "361100"
      },
      {
        text: "新余",
        id: "130900",
        administrativeCode: "360500"
      },
      {
        text: "宜春",
        id: "131000",
        administrativeCode: "360900"
      },
      {
        text: "鹰潭",
        id: "131100",
        administrativeCode: "360600"
      },
      {
        text: "共青城",
        id: "131200",
        administrativeCode: "360482"
      }
    ]
  },
  {
    text: "辽宁",
    id: "620000",
    administrativeCode: "210000",
    children: [
      {
        text: "沈阳",
        id: "620100",
        administrativeCode: "210100"
      },
      {
        text: "鞍山",
        id: "620200",
        administrativeCode: "210300"
      },
      {
        text: "本溪",
        id: "620300",
        administrativeCode: "210500"
      },
      {
        text: "朝阳",
        id: "620400",
        administrativeCode: "211300"
      },
      {
        text: "丹东",
        id: "620500",
        administrativeCode: "210600"
      },
      {
        text: "大连",
        id: "620600",
        administrativeCode: "210200"
      },
      {
        text: "抚顺",
        id: "620700",
        administrativeCode: "210400"
      },
      {
        text: "阜新",
        id: "620800",
        administrativeCode: "210900"
      },
      {
        text: "葫芦岛",
        id: "620900",
        administrativeCode: "211400"
      },
      {
        text: "锦州",
        id: "621000",
        administrativeCode: "210700"
      },
      {
        text: "辽阳",
        id: "621100",
        administrativeCode: "211000"
      },
      {
        text: "盘锦",
        id: "621200",
        administrativeCode: "211100"
      },
      {
        text: "铁岭",
        id: "621300",
        administrativeCode: "211200"
      },
      {
        text: "营口",
        id: "621400",
        administrativeCode: "210800"
      }
    ]
  },
  {
    text: "内蒙古",
    id: "520000",
    administrativeCode: "150000",
    children: [
      {
        text: "呼和浩特",
        id: "520100",
        administrativeCode: "150100"
      },
      {
        text: "阿拉善盟",
        id: "520200",
        administrativeCode: "152900"
      },
      {
        text: "包头",
        id: "520300",
        administrativeCode: "150200"
      },
      {
        text: "巴彦淖尔",
        id: "520400",
        administrativeCode: "150800"
      },
      {
        text: "赤峰",
        id: "520500",
        administrativeCode: "150400"
      },
      {
        text: "鄂尔多斯",
        id: "520600",
        administrativeCode: "150600"
      },
      {
        text: "呼伦贝尔",
        id: "520700",
        administrativeCode: "150700"
      },
      {
        text: "通辽",
        id: "520800",
        administrativeCode: "150500"
      },
      {
        text: "乌海",
        id: "520900",
        administrativeCode: "150300"
      },
      {
        text: "乌兰察布",
        id: "521000",
        administrativeCode: "150900"
      },
      {
        text: "兴安盟",
        id: "521100",
        administrativeCode: "152200"
      },
      {
        text: "锡林郭勒",
        id: "521200",
        administrativeCode: "152500"
      }
    ]
  },
  {
    text: "宁夏",
    id: "410000",
    administrativeCode: "640000",
    children: [
      {
        text: "银川",
        id: "410100",
        administrativeCode: "640100"
      },
      {
        text: "固原",
        id: "410200",
        administrativeCode: "640400"
      },
      {
        text: "石嘴山",
        id: "410300",
        administrativeCode: "640200"
      },
      {
        text: "吴忠",
        id: "410400",
        administrativeCode: "640300"
      },
      {
        text: "中卫",
        id: "410500",
        administrativeCode: "640500"
      }
    ]
  },
  {
    text: "青海",
    id: "420000",
    administrativeCode: "630000",
    children: [
      {
        text: "西宁",
        id: "420100",
        administrativeCode: "630100"
      },
      {
        text: "果洛州",
        id: "420200",
        administrativeCode: "632600"
      },
      {
        text: "海北州",
        id: "420300",
        administrativeCode: "632200"
      },
      {
        text: "海东",
        id: "420400",
        administrativeCode: "632100"
      },
      {
        text: "海南州",
        id: "420500",
        administrativeCode: "632500"
      },
      {
        text: "黄南州",
        id: "420600",
        administrativeCode: "632300"
      },
      {
        text: "海西州",
        id: "420700",
        administrativeCode: "632800"
      },
      {
        text: "玉树州",
        id: "420800",
        administrativeCode: "632700"
      }
    ]
  },
  {
    text: "四川",
    id: "320000",
    administrativeCode: "510000",
    children: [
      {
        text: "成都",
        id: "320100",
        administrativeCode: "510100"
      },
      {
        text: "阿坝州",
        id: "320200",
        administrativeCode: "513200"
      },
      {
        text: "巴中",
        id: "320300",
        administrativeCode: "511900"
      },
      {
        text: "德阳",
        id: "320400",
        administrativeCode: "510600"
      },
      {
        text: "达州",
        id: "320500",
        administrativeCode: "511700"
      },
      {
        text: "广安",
        id: "320600",
        administrativeCode: "511600"
      },
      {
        text: "广元",
        id: "320700",
        administrativeCode: "510800"
      },
      {
        text: "甘孜藏族",
        id: "320800",
        administrativeCode: "513300"
      },
      {
        text: "乐山",
        id: "320900",
        administrativeCode: "511100"
      },
      {
        text: "凉山彝族",
        id: "321000",
        administrativeCode: "513400"
      },
      {
        text: "泸州",
        id: "321100",
        administrativeCode: "510500"
      },
      {
        text: "眉山",
        id: "321200",
        administrativeCode: "511400"
      },
      {
        text: "绵阳",
        id: "321300",
        administrativeCode: "510700"
      },
      {
        text: "南充",
        id: "321400",
        administrativeCode: "511300"
      },
      {
        text: "内江",
        id: "321500",
        administrativeCode: "511000"
      },
      {
        text: "攀枝花",
        id: "321600",
        administrativeCode: "510400"
      },
      {
        text: "遂宁",
        id: "321700",
        administrativeCode: "510900"
      },
      {
        text: "雅安",
        id: "321800",
        administrativeCode: "511800"
      },
      {
        text: "宜宾",
        id: "321900",
        administrativeCode: "511500"
      },
      {
        text: "自贡",
        id: "322000",
        administrativeCode: "510300"
      },
      {
        text: "资阳",
        id: "322100",
        administrativeCode: "512000"
      }
    ]
  },
  {
    text: "山东",
    id: "140000",
    administrativeCode: "370000",
    children: [
      {
        text: "济南",
        id: "140100",
        administrativeCode: "370100"
      },
      {
        text: "滨州",
        id: "140200",
        administrativeCode: "371600"
      },
      {
        text: "东营",
        id: "140300",
        administrativeCode: "370500"
      },
      {
        text: "德州",
        id: "140400",
        administrativeCode: "371400"
      },
      {
        text: "菏泽",
        id: "140500",
        administrativeCode: "371700"
      },
      {
        text: "济宁",
        id: "140600",
        administrativeCode: "370800"
      },
      {
        text: "聊城",
        id: "140700",
        administrativeCode: "371500"
      },
      {
        text: "莱芜",
        id: "140800",
        administrativeCode: "371200"
      },
      {
        text: "临沂",
        id: "140900",
        administrativeCode: "371300"
      },
      {
        text: "青岛",
        id: "141000",
        administrativeCode: "370200"
      },
      {
        text: "日照",
        id: "141100",
        administrativeCode: "371100"
      },
      {
        text: "泰安",
        id: "141200",
        administrativeCode: "370900"
      },
      {
        text: "潍坊",
        id: "141300",
        administrativeCode: "370700"
      },
      {
        text: "威海",
        id: "141400",
        administrativeCode: "371000"
      },
      {
        text: "烟台",
        id: "141500",
        administrativeCode: "370600"
      },
      {
        text: "淄博",
        id: "141600",
        administrativeCode: "370300"
      },
      {
        text: "枣庄",
        id: "141700",
        administrativeCode: "370400"
      }
    ]
  },
  {
    text: "上海",
    id: "150000",
    administrativeCode: "310000",
    children: [
      {
        text: "上海",
        id: "150100",
        administrativeCode: "310000"
      }
    ]
  },
  {
    text: "陕西",
    id: "430000",
    administrativeCode: "610000",
    children: [
      {
        text: "西安",
        id: "430100",
        administrativeCode: "610100"
      },
      {
        text: "安康",
        id: "430200",
        administrativeCode: "610900"
      },
      {
        text: "宝鸡",
        id: "430300",
        administrativeCode: "610300"
      },
      {
        text: "汉中",
        id: "430400",
        administrativeCode: "610700"
      },
      {
        text: "商洛",
        id: "430500",
        administrativeCode: "611000"
      },
      {
        text: "铜川",
        id: "430600",
        administrativeCode: "610200"
      },
      {
        text: "渭南",
        id: "430700",
        administrativeCode: "610500"
      },
      {
        text: "咸阳",
        id: "430800",
        administrativeCode: "610400"
      },
      {
        text: "延安",
        id: "430900",
        administrativeCode: "610600"
      },
      {
        text: "榆林",
        id: "431000",
        administrativeCode: "610800"
      }
    ]
  },
  {
    text: "山西",
    id: "530000",
    administrativeCode: "140000",
    children: [
      {
        text: "太原",
        id: "530100",
        administrativeCode: "140100"
      },
      {
        text: "大同",
        id: "530200",
        administrativeCode: "140200"
      },
      {
        text: "晋城",
        id: "530300",
        administrativeCode: "140500"
      },
      {
        text: "晋中",
        id: "530400",
        administrativeCode: "140700"
      },
      {
        text: "临汾",
        id: "530500",
        administrativeCode: "141000"
      },
      {
        text: "吕梁",
        id: "530600",
        administrativeCode: "141100"
      },
      {
        text: "朔州",
        id: "530700",
        administrativeCode: "140600"
      },
      {
        text: "忻州",
        id: "530800",
        administrativeCode: "140900"
      },
      {
        text: "运城",
        id: "530900",
        administrativeCode: "140800"
      },
      {
        text: "阳泉",
        id: "531000",
        administrativeCode: "140300"
      },
      {
        text: "长治",
        id: "531100",
        administrativeCode: "140400"
      }
    ]
  },
  {
    text: "天津",
    id: "540000",
    administrativeCode: "120000",
    children: [
      {
        text: "天津",
        id: "540100",
        administrativeCode: "120000"
      }
    ]
  },
  {
    text: "台湾",
    id: "810000",
    administrativeCode: "710000",
    children: [
      {
        text: "台湾",
        id: "810100",
        administrativeCode: "710000"
      }
    ]
  },
  {
    text: "香港",
    id: "820000",
    administrativeCode: "810000",
    children: [
      {
        text: "香港",
        id: "820100",
        administrativeCode: "810000"
      }
    ]
  },
  {
    text: "新疆",
    id: "440000",
    administrativeCode: "650000",
    children: [
      {
        text: "乌鲁木齐",
        id: "440100",
        administrativeCode: "650100"
      },
      {
        text: "阿克苏市",
        id: "440200",
        administrativeCode: "652901"
      },
      {
        text: "阿勒泰市",
        id: "440300",
        administrativeCode: "654301"
      },
      {
        text: "博尔塔拉",
        id: "440400",
        administrativeCode: "652700"
      },
      {
        text: "巴音郭楞",
        id: "440500",
        administrativeCode: "652800"
      },
      {
        text: "昌吉州",
        id: "440600",
        administrativeCode: "652300"
      },
      {
        text: "哈密",
        id: "440700",
        administrativeCode: "652201"
      },
      {
        text: "和田市",
        id: "440800",
        administrativeCode: "653201"
      },
      {
        text: "克拉玛依",
        id: "440900",
        administrativeCode: "650200"
      },
      {
        text: "喀什市",
        id: "441000",
        administrativeCode: "653101"
      },
      {
        text: "克孜勒苏",
        id: "441100",
        administrativeCode: "653000"
      },
      {
        text: "石河子市",
        id: "441200",
        administrativeCode: "659001"
      },
      {
        text: "塔城市",
        id: "441300",
        administrativeCode: "654201"
      },
      {
        text: "吐鲁番",
        id: "441400",
        administrativeCode: "652101"
      },
      {
        text: "伊犁州",
        id: "441500",
        administrativeCode: "654000"
      },
      {
        text: "阿拉尔",
        id: "441600",
        administrativeCode: "659002"
      },
      {
        text: "图木舒克",
        id: "441700",
        administrativeCode: "659003"
      },
      {
        text: "五家渠",
        id: "441800",
        administrativeCode: "659004"
      },
      {
        text: "北屯",
        id: "441900",
        administrativeCode: "659005"
      },
      {
        text: "铁门关",
        id: "442000",
        administrativeCode: "659006"
      },
      {
        text: "双河",
        id: "442100",
        administrativeCode: "659007"
      },
      {
        text: "可克达拉",
        id: "442200",
        administrativeCode: "659008"
      },
      {
        text: "昆玉",
        id: "442300",
        administrativeCode: "659009"
      }
    ]
  },
  {
    text: "西藏",
    id: "330000",
    administrativeCode: "540000",
    children: [
      {
        text: "拉萨",
        id: "330100",
        administrativeCode: "540100"
      },
      {
        text: "阿里",
        id: "330200",
        administrativeCode: "542500"
      },
      {
        text: "昌都",
        id: "330300",
        administrativeCode: "542100"
      },
      {
        text: "林芝",
        id: "330400",
        administrativeCode: "542600"
      },
      {
        text: "那曲",
        id: "330500",
        administrativeCode: "542400"
      },
      {
        text: "桑珠孜区",
        id: "330600",
        administrativeCode: "542301"
      },
      {
        text: "山南",
        id: "330700",
        administrativeCode: "542200"
      }
    ]
  },
  {
    text: "云南",
    id: "340000",
    administrativeCode: "530000",
    children: [
      {
        text: "昆明",
        id: "340100",
        administrativeCode: "530100"
      },
      {
        text: "保山",
        id: "340200",
        administrativeCode: "530500"
      },
      {
        text: "楚雄州",
        id: "340300",
        administrativeCode: "532300"
      },
      {
        text: "德宏州",
        id: "340400",
        administrativeCode: "533100"
      },
      {
        text: "大理州",
        id: "340500",
        administrativeCode: "532900"
      },
      {
        text: "迪庆州",
        id: "340600",
        administrativeCode: "533400"
      },
      {
        text: "红河州",
        id: "340700",
        administrativeCode: "532500"
      },
      {
        text: "临沧",
        id: "340800",
        administrativeCode: "530900"
      },
      {
        text: "丽江",
        id: "340900",
        administrativeCode: "530700"
      },
      {
        text: "怒江州",
        id: "341000",
        administrativeCode: "533300"
      },
      {
        text: "曲靖",
        id: "341100",
        administrativeCode: "530300"
      },
      {
        text: "普洱",
        id: "341200",
        administrativeCode: "530802"
      },
      {
        text: "文山州",
        id: "341300",
        administrativeCode: "532600"
      },
      {
        text: "西双版纳",
        id: "341400",
        administrativeCode: "532800"
      },
      {
        text: "玉溪",
        id: "341500",
        administrativeCode: "530400"
      },
      {
        text: "昭通",
        id: "341600",
        administrativeCode: "530600"
      }
    ]
  },
  {
    text: "浙江",
    id: "160000",
    administrativeCode: "330000",
    children: [
      {
        text: "杭州",
        id: "160100",
        administrativeCode: "330100"
      },
      {
        text: "湖州",
        id: "160200",
        administrativeCode: "330500"
      },
      {
        text: "金华",
        id: "160300",
        administrativeCode: "330700"
      },
      {
        text: "嘉兴",
        id: "160400",
        administrativeCode: "330400"
      },
      {
        text: "丽水",
        id: "160500",
        administrativeCode: "331100"
      },
      {
        text: "宁波",
        id: "160600",
        administrativeCode: "330200"
      },
      {
        text: "衢州",
        id: "160700",
        administrativeCode: "330800"
      },
      {
        text: "绍兴",
        id: "160800",
        administrativeCode: "330600"
      },
      {
        text: "台州",
        id: "160900",
        administrativeCode: "331000"
      },
      {
        text: "温州",
        id: "161000",
        administrativeCode: "330300"
      },
      {
        text: "舟山",
        id: "161100",
        administrativeCode: "330900"
      }
    ]
  }
]
export { city }
