import * as tagRepository from "./tag.repository";
import { TagDTO } from "./tag.types";

export const createTag = (data: Omit<TagDTO, "id">) =>
  tagRepository.createTag(data);

export const getTagById = (id: number) =>
  tagRepository.getTagById(id);

export const updateTag = (id: number, data: Partial<TagDTO>) =>
  tagRepository.updateTag(id, data);

export const deleteTag = (id: number) =>
  tagRepository.deleteTag(id);

export const getTags = (page = 1, limit = 10) =>
  tagRepository.getTags(page, limit);
