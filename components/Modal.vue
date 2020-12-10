<template>
  <div id="modal-window" style="position: fixed; width: 100%; height: 100%; top: 0px; left: 0px; z-index: 1050; overflow: auto; background-color: rgba(0, 0, 0, 0.35)">
    <div class="modal-box modal-type-inverted modal-size-normal modal-theme-atlant" style="position: absolute; top: 50%; left: 50%; margin-top: -85.5px; margin-left: -1066.5px">
      <div class="modal-inner">
        <div class="modal-title">
          <h3>KDEX</h3>
          <a class="modal-close-btn" @click="$emit('close')"></a>
        </div>
        <div class="modal-text">
          <slot name="body"></slot>
        </div>
        <div class="modal-buttons">
          <a class="modal-btn btn-light-blue" @click="$emit('close')">{{ $t('Yes') }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/css/jquery_modal.css'
export default {
  name: 'Modal'
}
</script>
