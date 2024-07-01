import { DATE_CURRENT, DATE_CURRENT2, DATE_NEWER, DATE_OLDER } from "../image.config";
import { makeDescision, makeDescisionDate, makeDescisionPath, makeDescisionSize, makeDescisionStatus } from "./descision";

describe('📌 descisions', () => {
    describe('🚦 http status', () => {
        it('should update if http request had 200', () => {
            expect(makeDescisionStatus('200')).toEqual('UPDATE');
        });
        it('should NOT update if path is forwared', () => {
            expect(makeDescisionStatus('301')).toEqual('NO_CHANGE');
        });
        it('should update if path is erroring', () => {
            expect(makeDescisionStatus('404')).toEqual('NO_CHANGE');
        });
    });
    describe('🌐 path', () => {
        it('should update if path has changed', () => {
            expect(makeDescisionPath('oldPath', 'newPath')).toEqual('UPDATE');
        });
        it('should NOT update if path is the same', () => {
            expect(makeDescisionPath('oldPath', 'oldPath')).toEqual('NO_CHANGE');
        });
        it('should update if new Path', () => {
            expect(makeDescisionPath('', 'oldPath')).toEqual('UPDATE');
        });
    });
    describe('📏 size', () => {
        it('should update if size is in range', () => {
            expect(makeDescisionSize(100, 120)).toEqual('UPDATE');
        });
        it('should NOT update if size is too small', () => {
            expect(makeDescisionSize(100, 19)).toEqual('TOO_SMALL');
        });
        it('should NOT update if size is too big', () => {
            expect(makeDescisionSize(100, 201)).toEqual('TOO_BIG');
        });
    });
    describe('📅 time', () => {
        
        it('should update if time is newer', () => {
            expect(makeDescisionDate(DATE_CURRENT, DATE_NEWER)).toEqual('UPDATE');
        });
        it('should NOT update if time is older', () => {
            expect(makeDescisionDate(DATE_CURRENT, DATE_OLDER)).toEqual('IS_OLDER');
        });
        it('should NOT update if time is the same', () => {
            expect(makeDescisionDate(DATE_CURRENT, DATE_CURRENT2)).toEqual('NO_CHANGE');
        });
    });
    describe('📊 all together', () => {
        const PROFILE_SAMPLE = { id: 'willi84', url: 'foobar', imageUrl: 'imageurl', status: '200' }
        it('should update if time is newer and size is in range', () => {
            const oldItem = { lastModified: DATE_CURRENT, size: '100', ...PROFILE_SAMPLE };
            const newItem = { lastModified: DATE_NEWER, size: '120', ...PROFILE_SAMPLE };
            expect(makeDescision(oldItem, newItem)).toEqual(true);
        });
        it('should NOT update if time is older and size is too small', () => {
            const oldItem = { lastModified: DATE_CURRENT, size: '100', ...PROFILE_SAMPLE };
            const newItem = { lastModified: DATE_OLDER, size: '19', ...PROFILE_SAMPLE };
            expect(makeDescision(oldItem, newItem)).toEqual(false);
        });
        it('should NOT update if time is newer and size is too big', () => {
            const oldItem = { lastModified: DATE_CURRENT, size: '100', ...PROFILE_SAMPLE };
            const newItem = { lastModified: DATE_NEWER, size: '201', ...PROFILE_SAMPLE };
            expect(makeDescision(oldItem, newItem)).toEqual(false);
        });
    });
});