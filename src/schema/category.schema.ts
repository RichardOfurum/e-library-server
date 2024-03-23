import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type CategoryDocument = HydratedDocument<Category>


@Schema()
export class Category {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile', require: true })
    id: string;

    @Prop({ type: String, require: true })
    name: string;

    @Prop({ type: Date, default: Date.now() })
    created_at: Date

    @Prop({ type: Date, default: Date.now() })
    updated_at: Date

}

export const CategorySchema = SchemaFactory.createForClass(Category)