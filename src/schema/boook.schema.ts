import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type ProfileDocument = HydratedDocument<Book>

@Schema()
export class Book {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product', require: true })
    id: string;

    @Prop({ required: true })
    title: string;

    @Prop()
    author: string;

    @Prop({ required: true })
    description: string;

    @Prop()
    publisher: string;

    @Prop()
    publishedDate: Date;

    @Prop({ required: true })
    pages: number;

    // @Prop({ required: true })
    @Prop()
    image: string;

    @Prop({ required: true })
    url: string;

    // @Prop({ required: true })
    // category: string;

    @Prop([String]) // Define an array of strings
    categories: string[]; // This will store an array of book IDs or names, for example

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

}

export const BookSchema = SchemaFactory.createForClass(Book)