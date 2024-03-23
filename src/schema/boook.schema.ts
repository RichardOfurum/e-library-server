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
    publishDate: Date;

    @Prop({ required: true })
    pages: number;

    @Prop({ required: true })
    image: string;

    @Prop({ required: true })
    url: string;

    @Prop({ required: true })
    category: string;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

}

export const BookSchema = SchemaFactory.createForClass(Book)