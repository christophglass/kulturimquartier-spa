import { Entry, EntryCollection, EntrySkeletonType } from "contentful";

export interface IEntry extends Entry {}

export interface IEntryCollection extends EntryCollection<EntrySkeletonType, undefined, string> { }