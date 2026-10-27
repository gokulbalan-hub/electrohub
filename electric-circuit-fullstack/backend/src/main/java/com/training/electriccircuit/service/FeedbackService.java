package com.training.electriccircuit.service;

import com.training.electriccircuit.entity.Feedback;
import java.util.List;

public interface FeedbackService {

    Feedback saveFeedback(Feedback feedback);

    List<Feedback> getAllFeedback();

    void deleteFeedback(Long id);

}