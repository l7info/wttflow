import { sequelize } from "../config/sequelize";
import { Flow } from "../entities/Flow.entity";
import { Campaign as CampaignEntity } from "../entities/Campaign.entity";

// Models
import User from "../models/User";
import Setting from "../models/Setting";
import Contact from "../models/Contact";
import Ticket from "../models/Ticket";
import Whatsapp from "../models/Whatsapp";
import ContactCustomField from "../models/ContactCustomField";
import Message from "../models/Message";
import Queue from "../models/Queue";
import WhatsappQueue from "../models/WhatsappQueue";
import UserQueue from "../models/UserQueue";
import Company from "../models/Company";
import Plan from "../models/Plan";
import TicketNote from "../models/TicketNote";
import QuickMessage from "../models/QuickMessage";
import Help from "../models/Help";
import TicketTraking from "../models/TicketTraking";
import UserRating from "../models/UserRating";
import QueueOption from "../models/QueueOption";
import Schedule from "../models/Schedule";
import Tag from "../models/Tag";
import TicketTag from "../models/TicketTag";
import ContactList from "../models/ContactList";
import ContactListItem from "../models/ContactListItem";
import Files from "../models/Files";
import FilesOptions from "../models/FilesOptions";
import Chat from "../models/Chat";
import ChatMessage from "../models/ChatMessage";
import ChatUser from "../models/ChatUser";
import Announcement from "../models/Announcement";
import Baileys from "../models/Baileys";
import BaileysChats from "../models/BaileysChats";
import QueueIntegrations from "../models/QueueIntegrations";
import Prompt from "../models/Prompt";
import Invoices from "../models/Invoices";
import Subscriptions from "../models/Subscriptions";
import Campaign from "../models/Campaign";
import CampaignSetting from "../models/CampaignSetting";
import CampaignShipping from "../models/CampaignShipping";

// Adicionando as entidades ao Sequelize
sequelize.addModels([
  Flow,
  CampaignEntity,
  User,
  Setting,
  Contact,
  Ticket,
  Whatsapp,
  ContactCustomField,
  Message,
  Queue,
  WhatsappQueue,
  UserQueue,
  Company,
  Plan,
  TicketNote,
  QuickMessage,
  Help,
  TicketTraking,
  UserRating,
  QueueOption,
  Schedule,
  Tag,
  TicketTag,
  ContactList,
  ContactListItem,
  Files,
  FilesOptions,
  Chat,
  ChatMessage,
  ChatUser,
  Announcement,
  Baileys,
  BaileysChats,
  QueueIntegrations,
  Prompt,
  Invoices,
  Subscriptions,
  Campaign,
  CampaignSetting,
  CampaignShipping,
]);

export default sequelize;
