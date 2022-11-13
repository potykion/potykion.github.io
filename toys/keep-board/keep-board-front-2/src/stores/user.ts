import { User } from "@/logic/auth";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { useNoteStore } from "./note";



export const useUserStore = defineStore(
    'user', () => {
        const user: Ref<User | null> = ref(null);

        const { loadNotes } = useNoteStore();
        const auth = (token: string) => {
            user.value = User.setupFromToken(token);
            loadNotes(true);
        };

        const loadOrSetupAuth = async (selector: string) => {
            user.value = User.loadFromCache() ??
                User.setupAuth(selector, (token) => auth(token));
        }

        return { user, auth, loadOrSetupAuth };
    }
);