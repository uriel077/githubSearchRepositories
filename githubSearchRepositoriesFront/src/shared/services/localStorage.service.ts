import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService
{
    /**
     * get value from the storage.
     * @param key The key.
     */
    public getValue(key: string): any | null
    {
        return localStorage.getItem(key);
    }

    /**
     * Set value to local storage.
     * @param key The key.
     * @param value The value to insert to local storage.
     */
    public setValue(key: string, value: string): void
    {
        localStorage.setItem(key, value);
    }

    /**
     * Remove value from local storage.
     * @param key The key.
     */
    public removeValue(key: string): void
    {
        localStorage.removeItem(key);
    }
}
