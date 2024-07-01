export class CreatePreferenceDto {
  items: { title: string; unit_price: number; quantity: number }[];
  backUrls: { success: string; failure: string; pending: string };
}
