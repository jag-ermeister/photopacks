import logging

logger = logging.getLogger()


def modify_prompts(prompts, adjective, model_type):
    modified_prompts = []
    for prompt in prompts:
        if adjective != "":
            modified_prompt = prompt.replace("MODELNAME", f"{adjective} MODELNAME")
        else:
            modified_prompt = prompt
        modified_prompt = modified_prompt.replace("MODELNAME", f"ohwx {model_type}")
        modified_prompts.append(modified_prompt)
        logger.info(f"Modified prompt: {modified_prompt}")
    return modified_prompts
