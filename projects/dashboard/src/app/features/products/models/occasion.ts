import { MainResponse } from "../../../shared/models/main-response"
import { Metadata } from "../../../shared/models/metadata"

export type OccasionsList = MainResponse<OccasionsListPayload>;

export interface OccasionsListPayload {
  data: Occasion[];
  metadata: Metadata;
}

export type SingleOccasion = MainResponse<SingleOccasionPayload>;

export interface SingleOccasionPayload {
  occasion: Occasion;
}

export interface Occasion {
  id: string
  title: string
  description: string
  image: string
  immutable: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateOccasionRequest {
  title: string;
  description: string;
  image: string;
}

export interface DeleteOccasionResponse {
  status: boolean;
  code: number;
  message: string;
  payload: string;
}