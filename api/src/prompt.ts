import inquirer, { ListChoiceOptions } from "inquirer";

const availableMaps = ["surf_ski_2_trick"];

export enum ActionKeys {
  GENERATE_TRIGGERS = 1,
  GENERATE_TRICKS,
  GENERATE_TRICK_PATH,
  GENERATE_TELEPORTS,
}

interface PromptAnswer {
  map?: string;
  action?: ActionKeys;
}

const ActionNames: Record<number, string> = {
  [ActionKeys.GENERATE_TRIGGERS]: "Generate triggers (required: step 1)",
  [ActionKeys.GENERATE_TRICKS]: "Generate tricks (required: step 2)",
  [ActionKeys.GENERATE_TRICK_PATH]: "Generate trick path (required: step 3)",
  [ActionKeys.GENERATE_TELEPORTS]: "Generate teleports",
};

export const dataExportPrompt = async (): Promise<PromptAnswer> => {
  const answers = await inquirer.prompt([
    {
      name: "map",
      type: "list",
      choices: availableMaps,
    },
    {
      name: "action",
      type: "list",
      choices: [
        getAction(ActionKeys.GENERATE_TRIGGERS),
        getAction(ActionKeys.GENERATE_TRICKS),
        getAction(ActionKeys.GENERATE_TRICK_PATH),
        getAction(ActionKeys.GENERATE_TELEPORTS),
      ],
    },
  ]);

  return {
    map: answers.map,
    action: answers.action,
  };
};

const getAction = (actionKey: ActionKeys): ListChoiceOptions => {
  return {
    name: ActionNames[actionKey],
    value: actionKey,
  };
};
