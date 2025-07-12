def gini(groups, class_values): 
    total_instances = sum([len(group) for group in groups])
    best_gini = 0.0

    for group in groups:
        if not group:
            continue
        score = 0.0
        for class_val in class_values:
            proportion = [row[-1] for row in group].count(class_val) / len(group)
            score += proportion ** 2
        gini_score += (1 - score) * (len(group) / total_instances)
    return gini_score