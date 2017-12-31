<template lang="jade">
div
  ul#slide-out.side-nav
    template(v-for="item in $store.state.information.menu")
      li(v-if="item.type == 'user'")
        .user-view
          .background
            img.user-bg(:src="item.bg")
          a
            img.circle(:src="item.face")
          a
            span.white-text.name {{item.name}}
          a
            span.white-text {{item.desc}}
      li(v-if="item.type == 'link'")
        a.waves-effect(:href="item.url", target="_blank")
          i.material-icons(v-if="item.icon") {{item.icon}}
          | {{ item.text }}
      li(v-if="item.type == 'action'")
        a.waves-effect(@click="$store.dispatch(item.action)")
          i.material-icons(v-if="item.icon") {{item.icon}}
          | {{ item.text }}
      li(v-if="item.type == 'label'")
        a
          i.material-icons(v-if="item.icon") {{item.icon}}
          | {{ item.text }}
      template(v-if="item.type == 'title'")
        li
          .divider
        li
          a.subheader {{ item.text }}
  button#drawer-btn.drawer-btn.white.btn-floating.btn-large.waves-effect.waves-light(data-activates="slide-out")
    i.material-icons.large.black-text menu
</template>
<script>
export default {
  mounted(){
    window.$('.drawer-btn').sideNav()
  }
}
</script>
<style>
#drawer-btn{
  z-index: 98;
  position: fixed;
  left:  1rem;
  top:    1rem;
}
.user-bg{
  width: 100%;
  min-height: 100%;
}
</style>
