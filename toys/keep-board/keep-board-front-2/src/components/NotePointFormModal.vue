<template>
    <div>
        <div class="modal" id="edit-note-modal">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">

                    <p class="modal-card-title" v-if="noteStore.selectedNote">{{ modeStore.modeStr }} от {{
                            noteStore.selectedNote.created
                    }}</p>
                    <p class="modal-card-title" v-else>Создание {{ modeStore.modeStr }}</p>
                    <button class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body" v-if="pointStore.pointsForm">
                    <div class="field has-addons" v-for="(point, i) in pointStore.pointsForm.points" :key="i">
                        <div class="control has-icons-left is-expanded">
                            <input class="input is-small" :placeholder="categoryStore.categories[point.category]"
                                v-model="point.value">
                            <span class="icon is-small is-left">{{ point.category }}</span>
                        </div>
                        <div class="control">
                            <button class="button is-small" @click="pointsForm.removePoint(point, i)">❌</button>
                        </div>
                        <div class="control">
                            <button class="button is-small" @click="pointsForm.addPoint(point.category, i)">➕</button>
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot is-flex is-justify-content-right buttons">
                    <button v-if="noteStore.selectedNote" :class="['button', 'is-success', saving ? 'is-loading' : '']"
                        @click="saveNote">
                        Сохранить
                    </button>
                    <button v-if="!noteStore.selectedNote && modeStore.mode === 'weekly'" :class="['button', 'is-warning']"
                        @click="pointStore.fillWeeklyFormWithDaily">
                        Собрать из
                        дейли
                    </button>
                    <button v-if="!noteStore.selectedNote" :class="['button', 'is-success', saving ? 'is-loading' : '']"
                        @click="noteStore.createNote">Сохранить
                    </button>

                </footer>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useCategoryStore } from '@/stores/category';
import { useModeStore } from '@/stores/mode';
import { useNoteStore } from '@/stores/note';
import { usePointStore } from '@/stores/point';

const pointStore = usePointStore();
const noteStore = useNoteStore();
const modeStore = useModeStore();

const categoryStore = useCategoryStore();

</script>


<style  scoped>

</style>