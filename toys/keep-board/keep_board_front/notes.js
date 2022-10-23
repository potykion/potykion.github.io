export function loadNotesFromCache(key, reset) {
    const notesCache = JSON.parse(localStorage.getItem(key));
    if (
        notesCache &&
        (notesCache.notes ?? []).length &&
        dayjs() < dayjs(notesCache.exp ?? dayjs()) &&
        !reset
    ) {
        return notesCache.notes;
    } else {
        return null;
    }
}