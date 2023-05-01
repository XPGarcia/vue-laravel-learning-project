import { Survey, SurveyResponse } from "../types";

export class SurveyAdapter {
  static toDomain(payload: SurveyResponse): Survey {
    return {
      id: payload.id,
      title: payload.title,
      slug: payload.slug,
      description: payload.description,
      status: payload.status === 1 ? true : false,
      image:
        "https://prometeo-inventory-images.s3.amazonaws.com/images/categories/test3",
      expire_date: this.parseExpireDate(payload.expire_date),
      questions: payload.questions ?? [],
    };
  }

  static toDomains(payload: SurveyResponse[]): Survey[] {
    return payload.map((data) => this.toDomain(data));
  }

  static parseExpireDate(expireDateString?: string) {
    if (!expireDateString) return;

    return new Date(expireDateString);
  }
}
