import mongoose from 'mongoose';

const AnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    skillGap: {
      type: String,
      required: true,
    },
    improvedResume: {
      type: String,
      required: true,
    },
    interviewTips: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Analysis || mongoose.model('Analysis', AnalysisSchema);
