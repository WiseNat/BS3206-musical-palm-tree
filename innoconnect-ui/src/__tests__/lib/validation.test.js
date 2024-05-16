/**
 * @author Nathan Wise
 */
import { isValidUrl } from '@/app/lib/validation';

describe("isValidUrl", () => {
    it.each(
        ["https://www.google.co.uk/", "http://localhost:3000/ui/project/create"]
    )("return true when given the valid url '%s'", (input) => {
        expect(isValidUrl(input)).toBe(true);
    });

    it.each(
        ["test", "foo.", "BAR@BAZ", "www.google.co.uk", "google.co.uk"]
    )("return false when given the invalid url '%s'", (input) => {
        expect(isValidUrl(input)).toBe(false);
    });
});
