export default {
  'post /api/commons/citys': (req, res) => {
    res.json({
      status: 200,
      data: [[{ label: '杭州', value: '10001' }, { label: '苏州', value: '10002' }]]
    });
  },
  'post /api/house/hot': (req, res) => {
    res.json({
      status: 200,
      data: [
        {
          id: 1,
          img: 'https://imgs.qunarzz.com/p/p70/1809/e7/4941057a6aae702.jpg_256x160_9fee6ccb.jpg',
          title: '东城民宿',
          info: '东城区交通方便',
          price: '100'
        },
        {
          id: 2,
          img: 'https://imgs.qunarzz.com/p/p67/1512/a2/0ebfcd965b9391f7.jpg_256x160_04d5813d.jpg',
          title: '西城民宿',
          info: '西城区山水怡情',
          price: '120'
        },
        {
          id: 3,
          img: 'https://imgs.qunarzz.com/p/p12/201302/28/83ba8aa24931fbe493835fbb.jpg_256x160_7331b3d5.jpg',
          title: '新区民宿',
          info: '新区民宿位置优越',
          price: '200'
        },
        {
          id: 4,
          img: 'https://img1.qunarzz.com/sight/p0/1908/4e/4e82efecb2e8ade9a3.img.jpg_256x160_6e5d2993.jpg',
          title: '老城民宿',
          info: '老城区风景秀美',
          price: '220'
        }
      ]
    });
  }
};