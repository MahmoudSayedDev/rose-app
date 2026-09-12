// import { Component, signal } from '@angular/core';
// import { DynamicFieldConfig } from '../../shared/components/dynamic-form/models/dynamic-field-config.interface';
// import { DynamicFormComponent } from '../../shared/components/dynamic-form/dynamic-form/dynamic-form.component';
// import { ButtonComponent } from 'reusable-components';
// import { DynamicFormItem } from '../../shared/components/dynamic-form/models/dynamic-field-group.interface';
// import { Category } from '../categories/models/category';

// @Component({
//   selector: 'app-example',
//   imports: [DynamicFormComponent, ButtonComponent],
//   templateUrl: './test.component.html',
// })
// export class TestComponent {

//   categories = signal<Category[]>([
//     {
//       "id": "cd591d64-0558-482e-b256-9ac71b3f5312",
//       "title": "rose1",
//       "description": "ooo",
//       "image": "https://rose-app.elevate-bootcamp.cloud/storage/entities/category/category-dccf9be3b04b-1789044279038.png",
//       "immutable": false,
//       "createdAt": "2026-09-10T12:44:39.046Z",
//       "updatedAt": "2026-09-10T12:45:30.218Z",
//       "subCategories": [],
//       "_count": {
//         "products": 1
//       }
//     },
//     {
//       "id": "d2749339-9ac7-4798-9ade-d98ddc37fe33",
//       "title": "Romantic Flowers 8.8",
//       "description": "Flowers designed for romantic moments.",
//       "image": "https://rose-app.elevate-bootcamp.cloud/storage/entities/category/category-fbfde78c1e5d-1777381164933.png",
//       "immutable": false,
//       "createdAt": "2026-04-28T12:59:24.934Z",
//       "updatedAt": "2026-09-06T16:25:09.538Z",
//       "subCategories": [
//         {
//           "id": "5cfb1e82-fe7e-4d57-a852-c09a39df927d",
//           "title": "Love Bouquets"
//         },
//         {
//           "id": "6cf144f3-1ab9-4e3a-8b5d-14df1be252ab",
//           "title": "Valentine Specials"
//         },
//         {
//           "id": "b9590828-8095-49c4-ba1c-f1dcb9acab16",
//           "title": "Anniversary Flowers"
//         }
//       ],
//       "_count": {
//         "products": 0
//       }
//     },
//     {
//       "id": "5fd61a6a-e03e-487b-a2bd-02a8bbdfcabb",
//       "title": "Luxury Flowers",
//       "description": "High-end premium floral arrangements.",
//       "image": "https://rose-app.elevate-bootcamp.cloud/storage/entities/category/category-ead2bd2294f8-1777380967240.png",
//       "immutable": false,
//       "createdAt": "2026-04-28T12:56:07.248Z",
//       "updatedAt": "2026-04-28T12:56:07.248Z",
//       "subCategories": [
//         {
//           "id": "05931cd7-0fce-4bdc-adee-cb80a9601a50",
//           "title": "Classic Roses"
//         },
//         {
//           "id": "3f50b4bc-49b5-4dd8-abc6-68dd9ed4640d",
//           "title": "Luxury Rose Boxes"
//         },
//         {
//           "id": "ae62c946-c3e2-4ace-958c-d88489aa7f88",
//           "title": "Romantic Roses"
//         },
//         {
//           "id": "d1d65a7f-c8d6-4063-87a6-7c824476aa58",
//           "title": "Premium Roses"
//         },
//         {
//           "id": "d3fde7a7-d6a5-49c4-ae0b-b939d31961ab",
//           "title": "Premium Roses"
//         }
//       ],
//       "_count": {
//         "products": 9
//       }
//     },
//     {
//       "id": "799bab5d-6133-412c-8353-cf776467e3be",
//       "title": "flower",
//       "description": "Flower-based gift items for special occasions.",
//       "image": "https://rose-app.elevate-bootcamp.cloud/storage/entities/category/category-aaeb9e8a4849-1777380759490.png",
//       "immutable": false,
//       "createdAt": "2026-04-28T12:52:39.491Z",
//       "updatedAt": "2026-08-27T07:47:36.320Z",
//       "subCategories": [
//         {
//           "id": "c33eedc1-d834-4a07-add4-b57a76e2a119",
//           "title": "Floral Gifts"
//         }
//       ],
//       "_count": {
//         "products": 18
//       }
//     },
//     {
//       "id": "56262b2c-e274-4cba-b861-e8519f69f085",
//       "title": "Event Decor",
//       "description": "Floral decorations for events and celebrations.",
//       "image": "https://rose-app.elevate-bootcamp.cloud/storage/entities/category/category-18001d96a3d5-1777380640959.png",
//       "immutable": false,
//       "createdAt": "2026-04-28T12:50:40.960Z",
//       "updatedAt": "2026-04-28T12:50:40.960Z",
//       "subCategories": [
//         {
//           "id": "4598bb42-8f80-44a9-a7fb-eb3f73355fb6",
//           "title": "Party Decorations"
//         },
//         {
//           "id": "9962427a-0c7f-4b97-a23b-221ae8d52df0",
//           "title": "Formal Events"
//         }
//       ],
//       "_count": {
//         "products": 17
//       }
//     },
//     {
//       "id": "f2ab0eb5-f32d-4918-bbaf-68b0d01dd78b",
//       "title": "Wedding Collection",
//       "description": "Elegant floral designs for weddings and ceremonies.",
//       "image": "https://rose-app.elevate-bootcamp.cloud/storage/entities/category/category-39cd659cc0da-1777380497091.png",
//       "immutable": false,
//       "createdAt": "2026-04-28T12:48:17.094Z",
//       "updatedAt": "2026-04-28T12:48:17.094Z",
//       "subCategories": [
//         {
//           "id": "c714f8c1-71b6-4c26-b984-8c598c282480",
//           "title": "Bridal Bouquets"
//         },
//         {
//           "id": "c7ed9a88-d314-4431-b88f-4f8174c43e84",
//           "title": "Wedding Bouquets"
//         }
//       ],
//       "_count": {
//         "products": 0
//       }
//     },
//     {
//       "id": "f283f301-6bc8-4c0e-8992-0435d0e25658",
//       "title": "Plants",
//       "description": "Indoor and outdoor decorative plants.",
//       "image": "https://rose-app.elevate-bootcamp.cloud/storage/entities/category/category-a1ed8177d846-1777380394977.png",
//       "immutable": false,
//       "createdAt": "2026-04-28T12:46:34.978Z",
//       "updatedAt": "2026-04-28T12:46:34.978Z",
//       "subCategories": [
//         {
//           "id": "09b56c19-df04-49d4-9fce-89d2f3a9527c",
//           "title": "Indoor Plants"
//         },
//         {
//           "id": "4ef02e8a-ad88-444c-8166-e6f7c2f0a341",
//           "title": "Outdoor Plants"
//         },
//         {
//           "id": "87127589-055d-4a52-b822-d8138de74a10",
//           "title": "Air Purifying Plants"
//         }
//       ],
//       "_count": {
//         "products": 5
//       }
//     },
//     {
//       "id": "03a4178e-2fec-4c47-ab10-033894cb5f20",
//       "title": "Flower Boxes",
//       "description": "Luxury boxed flower arrangements for gifting.",
//       "image": "https://rose-app.elevate-bootcamp.cloud/storage/entities/category/category-4c9e40558dfb-1777380352542.png",
//       "immutable": false,
//       "createdAt": "2026-04-28T12:45:52.542Z",
//       "updatedAt": "2026-04-28T12:45:52.542Z",
//       "subCategories": [
//         {
//           "id": "afc9146c-e845-4666-853c-d576f4d4a8d7",
//           "title": "Luxury Flower Boxes"
//         },
//         {
//           "id": "cc36f85e-5de1-447f-bb28-25a3d485f75e",
//           "title": "Gift Flower Boxes"
//         }
//       ],
//       "_count": {
//         "products": 22
//       }
//     },
//     {
//       "id": "1d8fbca7-5de8-44e9-b97e-835b769be2b1",
//       "title": "Bouquets",
//       "description": "Hand-crafted floral bouquets for all occasions.",
//       "image": "https://rose-app.elevate-bootcamp.cloud/storage/entities/category/category-e4bfd9009207-1777380272846.png",
//       "immutable": false,
//       "createdAt": "2026-04-28T12:44:32.849Z",
//       "updatedAt": "2026-04-28T12:44:32.849Z",
//       "subCategories": [
//         {
//           "id": "48450650-0a5f-4956-b5f7-3cd65ba70ce7",
//           "title": "Event Bouquets"
//         },
//         {
//           "id": "dac82feb-9724-43bd-851c-f2d9ee27c6d2",
//           "title": "Romantic Bouquets"
//         }
//       ],
//       "_count": {
//         "products": 7
//       }
//     },
//     {
//       "id": "89b21293-0d1c-4602-8e10-56580a431e60",
//       "title": "Mixed Flowers",
//       "description": "Beautiful combinations of seasonal flowers.",
//       "image": "https://rose-app.elevate-bootcamp.cloud/storage/entities/category/category-f71a5beb46ff-1777380231768.png",
//       "immutable": false,
//       "createdAt": "2026-04-28T12:43:51.769Z",
//       "updatedAt": "2026-04-28T12:43:51.769Z",
//       "subCategories": [
//         {
//           "id": "6e8d569b-cc56-458f-8215-527be88aa0fd",
//           "title": "Seasonal Bouquets"
//         },
//         {
//           "id": "93a85d8f-4260-465d-9215-509280b6d26e",
//           "title": "Seasonal Mix"
//         },
//         {
//           "id": "b0451a3e-7544-41fd-9452-9561790aef26",
//           "title": "Celebration Bouquets"
//         }
//       ],
//       "_count": {
//         "products": 21
//       }
//     },
//     {
//       "id": "a3eb8305-2669-43b2-b7dc-8bee519e115d",
//       "title": "Roses",
//       "description": "Premium rose bouquets in different colors and styles.",
//       "image": "https://rose-app.elevate-bootcamp.cloud/storage/entities/category/category-c6c0d6746a56-1777380182612.png",
//       "immutable": false,
//       "createdAt": "2026-04-28T12:43:02.613Z",
//       "updatedAt": "2026-04-28T12:43:02.613Z",
//       "subCategories": [
//         {
//           "id": "41440703-9962-4872-b78b-39473466a0ad",
//           "title": "Rose Boxes"
//         },
//         {
//           "id": "88038641-daab-4ad6-9cc2-565a1412dffe",
//           "title": "Rose Boxes"
//         },
//         {
//           "id": "9e710d3a-30ee-4457-b850-5cc3a9008da0",
//           "title": "Rose Bouquets"
//         }
//       ],
//       "_count": {
//         "products": 11
//       }
//     },
//     {
//       "id": "2e225dea-502e-449c-8502-fbf4ae6532e4",
//       "title": "Flowers",
//       "description": "Fresh flowers and bouquets",
//       "image": "https://rose-app.elevate-bootcamp.cloud/api/upload/temp/d33eff4b-6b31-49ed-ab5b-ee16751e6df7",
//       "immutable": false,
//       "createdAt": "2026-04-01T13:38:54.502Z",
//       "updatedAt": "2026-04-01T13:38:54.502Z",
//       "subCategories": [],
//       "_count": {
//         "products": 1
//       }
//     }
//   ])

//   readonly fields: DynamicFormItem[] = [
//     {
//       name: 'title',
//       type: 'text',
//       label: 'products.forms.Title',
//       placeholder: 'products.forms.Enter product title',
//       validators: {
//         required: true,
//         minLength: 3,
//       },
//       errorMessages: {
//         required: 'products.forms.validation.Product title is required',
//       }
//     },

//     {
//       class: 'grid grid-cols-1 lg:grid-cols-3 gap-3 mb-4',
//       fields: [
//         {
//           name: 'role',
//           type: 'multiselect',
//           label: 'Role',
//           placeholder: 'Select your role',
//           options: this.categories(),
//           validators: {
//             required: true,
//           },
//         },
//         {
//           name: 'email',
//           type: 'email',
//           label: 'Email',
//           placeholder: 'Enter your email',
//           validators: {
//             required: true,
//             email: true,
//           },
//         },

//         {
//           name: 'password',
//           type: 'password',
//           label: 'Password',
//           placeholder: 'Enter your password',
//           validators: {
//             required: true,
//             minLength: 8,
//           },
//         },
//       ]
//     },

//     {
//       name: 'bio',
//       type: 'textarea',
//       label: 'Bio',
//       placeholder: 'Tell us about yourself',
//       validators: {
//         maxLength: 200,
//         required: true
//       },
//     },

//     {
//       name: 'categories',
//       type: 'select',
//       label: 'Role',
//       placeholder: 'Select your role',
//       options: this.categories(),
//       validators: {
//         required: true,
//       },
//     },



//     {
//       name: 'profileImage',
//       type: 'file',
//       label: 'Profile Image',
//       acceptedFileTypes: ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'],
//       maxFileSize: 5 * 1024 * 1024,
//       multiple: true,
//       validators: {
//         required: true,
//       },
//     },
//   ];

//   onSubmit(data: Record<string, unknown>): void {
//     console.log('Form submitted:', data);
//   }
// }
