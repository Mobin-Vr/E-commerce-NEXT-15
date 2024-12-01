import { StructureBuilder } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
   S.list()
      .title('Shopr Ecommerce Website')
      .items([
         S.documentTypeListItem('category').title('Categories'),
         S.divider(),
         ...S.documentTypeListItems().filter(
            (item) =>
               item.getId() && !['post', 'category'].includes(item.getId())
         ),
      ]);
