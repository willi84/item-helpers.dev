import { getProjects } from './result';
import * as FS from './../_shared/fs/fs';
// Import the function to be tested

// Describe block for grouping tests
describe('projects', () => {
  let mockCommand: jest.SpyInstance;
  beforeEach(() => {
    mockCommand = jest.spyOn(FS, 'readFile').mockImplementation((path: string) => {
      return path === 'x' ? undefined : '["bahn-helpers.dev", "tiny-helpers.dev", "ng-helpers.dev", "rad-helpers.dev"]';
    });
  });
  afterEach(() => {
    mockCommand.mockRestore();
  })
  // it('should get 3 project names if they are defined', () => {
  //   const projects = ["bahn-helpers.dev", "tiny-helpers.dev", "ng-helpers.dev"];
  //   const result = getProjects(projects);

  //   const items = result.items.map((item: any) => item.name);
  //   console.log(items)
  //   console.log(projects)
  //   expect(items.sort()).toEqual( projects.sort()); // Expect the result to be 8 when adding 5 and 3
  // });
  it('should get all project names if not defined', () => {
    // TODO: mock get projects
    // mock get FileList
    const projects = ["bahn-helpers.dev", "tiny-helpers.dev", "ng-helpers.dev", "rad-helpers.dev"];
    const result = getProjects([]);
    console.log(result);

    const items = result.items.map((item: any) => item.name);
    expect(items.sort()).toEqual( projects.sort()); // Expect the result to be 8 when adding 5 and 3
  });

  // Add more test cases as needed
});
