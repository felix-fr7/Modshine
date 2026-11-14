// Shared toJSON transform: expose our string `id`, hide Mongo internals
export const cleanJSON = {
  versionKey: false,
  transform: (_doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
};
