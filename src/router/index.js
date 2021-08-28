import Vue from "vue"
import VueRouter from "vue-router"
// const PageTransition = () => import("../PageTransition.vue")
// const oilGasList = () => import("../views/putOilGas/oilGasList.vue")
// const search = () => import("../views/putOilGas/search.vue")
// const oilGasDetails = () => import("../views/putOilGas/oilGasDetails.vue")
// const mapStation = () => import("../views/putOilGas/mapStation.vue")
VueRouter.prototype.goBack = function() {
  this.isBack = true
  window.history.go(-1)
}
Vue.use(VueRouter)
const routes = [
  {
    path: "/",
    component: resolve => {
      require(["../PageTransition.vue"], resolve)
    },
    redirect: "/oilGasList",
    children: [
      {
        path: "/oilGasList",
        name: "oilGasList",
        component: resolve => {
          require(["../views/putOilGas/oilGasList.vue"], resolve)
        },
        meta: {
          title: "加油加气"
        }
      },
      {
        path: "/search",
        name: "search",
        component: resolve => {
          require(["../views/putOilGas/search.vue"], resolve)
        },
        meta: {
          title: "油站搜索"
        }
      },
      {
        path: "/oilGasDetails",
        name: "oilGasDetails",
        component: resolve => {
          require(["../views/putOilGas/oilGasDetails.vue"], resolve)
        },
        meta: {
          title: "油站详情"
        }
      },
      {
        path: "/mapStation",
        name: "mapStation",
        component: resolve => {
          require(["../views/putOilGas/mapStation.vue"], resolve)
        },
        meta: {
          title: "地图模式"
        }
      },
      {
        path: "/orders",
        name: "orders",
        component: resolve => {
          require(["../views/orders/orders.vue"], resolve)
        },
        meta: {
          title: "油气订单"
        }
      },
      {
        path: "/orderDetail",
        name: "orderDetail",
        component: resolve => {
          require(["../views/orders/orderDetail.vue"], resolve)
        },
        meta: {
          title: "订单详情"
        }
      },
      {
        path: "/pay",
        name: "pay",
        component: resolve => {
          require(["../views/pay/pay.vue"], resolve)
        },
        meta: {
          title: "付款"
        }
      }
    ]
  }
]

const router = new VueRouter({
  // scrollBehavior: () => ({ y: 0 }),
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.title) {
//     document.title = to.meta.title
//   }
//   next()
// })

export default router
